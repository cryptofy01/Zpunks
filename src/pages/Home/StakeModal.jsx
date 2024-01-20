import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useWalletContext from "../../hooks/useWalletContext";
import BlueButton from "../../components/Buttons/BlueButton";
import { getAlphaInHex, getColorWithAlpha } from "../../themes/colors";
import { truncNumber } from "../../utils/NumberUtils/formatNumbers";

export const BuyModal = ({
  open,
  setOpen,
  pool,
  /*min, max,*/ level,
  min,
  max,
  balance,
  tier,
  startColor,
  endColor,
  stake,
}) => {
  const decimals = pool?.token?.decimals;
  const currency = pool?.token?.symbol;

  const [value, setValue] = useState("0");
  const [useMax, setUseMax] = useState(false);
  const [busy, setBusy] = useState(false);
  const [inError, setInError] = useState("");
  const [waitingForNetwork] = useState(false);
  const walletContext = useWalletContext();

  //const path = [process.env.WBNB_ADDRESS, process.env.USDT_ADDRESS];

  const { enqueueSnackbar } = useSnackbar();

  const currentMax = balance?.value?.gt(
    max?.value || ethers.constants.MaxUint256
  )
    ? max?.value
    : balance?.value;

  useEffect(() => {
    if (
      currentMax &&
      !useMax &&
      Number(value) > Number(ethers.utils.formatUnits(currentMax, decimals))
    ) {
      setInError("Exceeded Balance/Max");
    } else {
      if (
        min?.value &&
        Number(value) < Number(ethers.utils.formatUnits(min?.value, decimals))
      ) {
        setInError(
          "Minimum not met (min = " +
            truncNumber(ethers.utils.formatUnits(min?.value, decimals), 4) +
            ` ${currency})`
        );
      } else setInError("");
    }
  }, [value]);

  const handleStake = async () => {
    setBusy(true);
    try {
      const amount = useMax
        ? currentMax
        : ethers.utils.parseUnits(value, decimals);
      const signer = walletContext.signer;

      const tr = await stake(Number(level) - 1, amount, signer);

      console.log("hash", tr.hash);
      console.log("tr", tr);

      enqueueSnackbar("Transaction Successful", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(e.reason, { variant: "error" });
    } finally {
      setUseMax(false);
      setValue("0");
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <AmountDialog
      startColor={startColor}
      endColor={endColor}
      decimals={Number(decimals)}
      tier={tier}
      title={waitingForNetwork ? "Reading On Chain Data..." : "Stake"}
      value={value}
      inError={inError}
      maxAmount={
        balance?.value?.gt(max?.value || ethers.constants.MaxUint256)
          ? max?.value
          : balance?.value
      }
      setUseMax={setUseMax}
      setValue={setValue}
      busy={busy}
      handleAction={handleStake}
      open={open}
      setOpen={setOpen}
      currency={currency}
    />
  );
};

BuyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  balance: PropTypes.object.isRequired,
  pool: PropTypes.object.isRequired,
  min: PropTypes.object,
  max: PropTypes.object,
  stake: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
};

export const AmountDialog = ({
  title,
  decimals,
  inError,
  value,
  setValue,
  setUseMax,
  maxAmount,
  setOpen,
  open,
  handleAction,
  busy,
  tier,
  startColor,
  endColor,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      onClose={() => {
        setOpen(false);
        setValue("0");
      }}
      PaperProps={{
        style: {
          backdropFilter: "blur(10px)",
          background: `linear-gradient(90deg, ${
            startColor + getAlphaInHex(0.3)
          } 0%, ${endColor + getAlphaInHex(0.3)} 100%)`,
          borderRadius: 5,
        },
      }}
      sx={{
        //backdropFilter: "blur(5px)",
        backgroundColor: getColorWithAlpha("#000000", 0.3),
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(90deg, ${
            startColor + getAlphaInHex(0.3)
          } 0%, ${endColor + getAlphaInHex(0.3)} 100%)`,
          //backgroundColor: (theme) => theme.palette.primary.main + "aa",
        }}
      >
        {title + " " + tier + " Tier"}
      </DialogTitle>

      <DialogContent dividers sx={{ padding: 1, pt: 2 }}>
        <TextField
          error={!!inError}
          helperText={
            inError
              ? inError
              : `Current Balance/Max Deposit: ${
                  maxAmount
                    ? truncNumber(
                        ethers.utils.formatUnits(maxAmount, decimals),
                        4
                      )
                    : 0
                }`
          }
          placeholder="Amount"
          variant="outlined"
          sx={{
            //backgroundColor: "#2B2D3A77",
            borderRadius: 1,
            //p: 0,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                //backgroundColor: "#2B2D3A77",
                //p: 0,
                //borderRadius: "32px",
                borderColor: endColor + "55",
              },
              "&:hover fieldset": {
                borderColor: endColor,
              },
              "&.Mui-focused fieldset": {
                borderColor: startColor,
                color: startColor,
              },
              "&.Mui-error fieldset": {
                borderColor: "#FF0000",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: startColor,
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={busy}
                  sx={{
                    border: "none",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                  style={{ color: startColor }}
                  onClick={() => {
                    setValue("" + Number(maxAmount) / 10 ** decimals);
                    setUseMax(true);
                  }}
                >
                  Use Max
                </Button>
              </InputAdornment>
            ),
          }}
          label={"Amount"}
          value={value}
          onChange={(event) => {
            setValue(
              Number(event.target.value) || Number(event.target.value) === 0
                ? event.target.value
                : value
            );
            setUseMax(false);
          }}
          onFocus={() => {
            if (value == 0) {
              setValue("");
            }
          }}
        />
        {/*false && <FormControl
                    error={!!inError}
                    fullWidth
                    sx={{
                        p: 0,
                        //backgroundColor: "#2B2D3A55",
                        //borderRadius: "32px",
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                //p: 0,
                                //borderRadius: "32px",
                                //borderColor: "fff",
                            },
                            "&:hover fieldset": {
                                borderColor: "#fff",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#fff",
                            },
                        },
                    }}
                    variant="outlined"
                >
                    <InputLabel sx={{color: startColor}}>Amount</InputLabel>
                    <OutlinedInput
                        label={"Amount"}
                        type={"number"}
                        fullWidth
                        value={value}
                        onChange={(event) => {
                            setValue(
                                Number(event.target.value) || Number(event.target.value) === 0
                                    ? event.target.value
                                    : value
                            );
                            setUseMax(false);
                        }}
                        onFocus={() => {
                            if (value == 0) {
                                setValue("");
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Button
                                    sx={{
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                    style={{color: startColor}}
                                    onClick={() => {
                                        setValue("" + Number(maxAmount) / 10 ** decimals);
                                        setUseMax(true);
                                    }}
                                >
                                    Use Max
                                </Button>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{`Current Balance: ${
                        maxAmount ? ethers.utils.formatUnits(maxAmount, decimals) : 0
                    }`}</FormHelperText>
                </FormControl>*/}
        {/*false && !!inError && (
                    <Alert severity={"error"} style={{ marginTop: 6, marginBottom: 6 }}>
                        {inError}
                    </Alert>
                )*/}
        <Grid container spacing={2} style={{ marginTop: 6 }}>
          <Grid item xs={12} md={6}>
            <BlueButton
              busy={busy}
              sx={{
                color: "#000",
                fontWeight: 700,
                backgroundColor: startColor,
                background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
                border: "1px solid " + startColor,
                borderRadius: 1,
                "&.Mui-disabled": {
                  color: "gray",
                },
              }}
              //variant={"contained"}
              fullWidth
              //color={"primary"}
              disabled={busy || !!inError || !value || Number(value) === 0}
              onClick={handleAction}
            >
              {title}
            </BlueButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <BlueButton
              sx={{
                color: "#000",
                fontWeight: 700,
                backgroundColor: startColor,
                background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
                border: "1px solid " + startColor,
                borderRadius: 1,
                "&:hover": {
                  background: "unset",
                  backgroundColor: startColor,
                },
                "&.Mui-disabled": {
                  color: "gray",
                },
              }}
              //color={"primary"}
              //variant={"contained"}
              fullWidth
              disabled={busy}
              busy={busy}
              onClick={() => {
                setOpen(false);
                setValue("0");
              }}
            >
              Cancel
            </BlueButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

AmountDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  maxAmount: PropTypes.object,
  decimals: PropTypes.number,
  inError: PropTypes.string,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  setUseMax: PropTypes.func,
  useMax: PropTypes.bool,
  tier: PropTypes.string,
  handleAction: PropTypes.func,
  busy: PropTypes.bool,
};
