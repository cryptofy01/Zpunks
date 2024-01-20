import GradientCard from "../../components/Cards/GradientCard";
import { colors } from "../../themes/colors";
import CardToken from "../../components/Cards/CardToken";
import Box from "@mui/material/Box";
import { Grid, useTheme } from "@mui/material";
import CardDetailsIcon from "../../components/Cards/CardDetailsIcon";
import PropTypes from "prop-types";
import BlueButton from "../../components/Buttons/BlueButton";
import { truncNumber } from "../../utils/NumberUtils/formatNumbers";
import BarredProgress from "../../components/Progress/BarredProgress";
import useWalletContext from "../../hooks/useWalletContext";
import { useState } from "react";
import { getChain } from "../../web3Utils/ChainUtils/chainList";
import { BuyModal } from "./StakeModal";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import CountdownTimer from "../../components/CountDown";
import useTransplantStaking from "../../hooks/TransplantStaking/useTransplantStaking";
import Divider from "@mui/material/Divider";

const tierColors = {
  bronze: {
    start: colors.bronzeStart,
    end: colors.bronzeEnd,
  },
  silver: {
    start: colors.silverStart,
    end: colors.silverEnd,
  },
  gold: {
    start: colors.goldStart,
    end: colors.goldEnd,
  },
};

/**
 * @param tier bronze, silver, gold
 * @param lockPeriod {number} in days
 * @param apy {number} in percentage
 * @param imageUrl {string}
 * @param poolDetails {minAmount: UseQueryResult<{formatted: *, decimals: *, value: BigNumber}, unknown>, allLevelDetails: UseQueryResult<{amount: {formatted: *, decimals: string, value: *}, initialTime: {date: *, value: number}, level: number, pendingRewards: {formatted: *, decimals: string, value: *}, endTime: {date: *, value: number}, rewardAmount: {formatted: *, decimals: string, value: *}, withdrawAmount: {formatted: *, decimals: string, value: *}, isActive: *}[], *>, totalEarned: undefined, penalty: UseQueryResult<number, unknown>, totalUserStaked: undefined, allowance: {isLoadingError: boolean, errorUpdateCount: number, data: ({formatted: *, decimals: *, value: BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{formatted: *, decimals: *, value: BigNumber}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, emergencyWithdraw: (function(*, *): Promise<*>), stake: (function(*, *, *): Promise<*>), TiersDetails: UseQueryResult<{lockPeriod: number, apy: number}[], *>, balance: {isLoadingError: boolean, errorUpdateCount: number, data: ({value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{amount: BigNumber, formatted: *, decimals: *}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, usdPrice: undefined, totalPending: undefined, maxAmount: UseQueryResult<{formatted: *, decimals: *, value: BigNumber}, unknown>, withdraw: (function(*, *): Promise<*>)}
 * @param pool
 * @param level
 * @returns {JSX.Element}
 * @constructor
 */
const FarmCard = ({
  tier,
  //lockPeriod,
  apy,
  imageUrl,
  //poolDetails,
  pool,
  level,
}) => {
  const theme = useTheme();
  const walletContext = useWalletContext();
  const [busy, setBusy] = useState(false);
  const tierLower = tier?.toLowerCase();
  const startColor = tierColors[tierLower]?.start || colors.bronzeStart;
  const endColor = tierColors[tierLower]?.end || colors.bronzeEnd;
  const { enqueueSnackbar } = useSnackbar();

  /**
   *
   * @type {{paused: import('react-query').UseQueryResult<boolean, *>, userData: import('react-query').UseQueryResult<{votingPower: {formatted: string, decimals: number, value: BigNumber.BigNumber}, estimatedRewards: {formatted: *, decimals: number, value: *}[], totalStaked: {formatted: string, decimals: number, value: BigNumber.BigNumber}, deposits: {amount: {formatted: *, decimals: number, value: *}, depositTime: {date: *, seconds: *}}[], historicalRewards: {formatted: string, decimals: number, value: BigNumber.BigNumber}, totalRewards: {formatted: string, decimals: number, value: BigNumber.BigNumber}}, *>, balance: {isLoadingError: boolean, errorUpdateCount: number, data: ({value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{amount: BigNumber, formatted: *, decimals: *}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, usdPrice: undefined, allowance: {isLoadingError: boolean, errorUpdateCount: number, data: ({formatted: *, decimals: *, value: BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{formatted: *, decimals: *, value: BigNumber}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, farmData: import('react-query').UseQueryResult<{totalVotingPower: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}, decimals: number, pools: {votingWeight: *, lockPeriod: {seconds: *, days}, totalEstimatedRewards: {formatted: *, decimals: BigNumber.BigNumber, value: *}, minDeposit: {formatted: *, decimals: BigNumber.BigNumber, value: *}, apy: *, totalStaked: {formatted: *, decimals: BigNumber.BigNumber, value: *}}[], totalStaked: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}, token: string, totalRewards: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}}, *>}}
   */
  const farmData = useTransplantStaking({
    stakingAddress: pool?.poolAddress,
    tokenAddress: pool?.token?.address,
    chainId: walletContext.chain.id,
    provider: walletContext?.provider,
    user: walletContext?.address,
  });

  //const penalty = 0;

  const tierData = farmData?.farmData?.data?.pools[level - 1];
  const tierUserData = farmData?.userData?.data?.deposits[level - 1];
  const tierRewards = farmData?.userData?.data?.estimatedRewards[level - 1];
  //const tierVotingPower = farmData?.userData?.data?.votingPower;

  const minAmount = tierData?.minDeposit;
  //const maxAmount = poolDetails?.maxAmount?.data;
  const staked = truncNumber(tierUserData?.amount?.formatted, 2);
  const stakedValue = truncNumber(
    Number(tierUserData?.amount?.formatted) *
      Number(farmData?.usdPrice?.formatted),
    4
  );
  const pending = truncNumber(tierRewards?.formatted, 4);
  const pendingValue = truncNumber(
    Number(tierRewards?.formatted) * Number(farmData?.usdPrice?.formatted),
    4
  );

  const fetchedAPY = tierData?.apy || null;
  //const balance = truncNumber(poolDetails?.balance?.data?.formatted, 4);
  const enoughAllowance =
    farmData?.balance?.data &&
    farmData?.allowance?.data &&
    farmData?.allowance?.data?.value?.gte(farmData?.balance?.data?.value);

  const hasAStake = staked && Number(tierUserData?.amount?.formatted) > 0;

  const canStake =
    farmData?.balance?.data &&
    minAmount &&
    farmData?.balance?.data?.value?.gte(minAmount?.value) &&
    farmData?.balance?.data?.value?.gte(1n);
  console.log("canStake " + tier + " ", canStake);

  const FetchedLockPeriod = tierData?.lockPeriod?.days || null;
  const unlocked =
    FetchedLockPeriod === 0 ||
    Number(tierUserData?.depositTime?.seconds) +
      Number(tierData?.lockPeriod?.days) * 60 * 60 * 24 <
      Date.now() / 1000;
  console.log("isunLocked " + tier + " ", unlocked);

  const [open, setOpen] = useState(false);
  //const c = '#FE6B8B';

  console.log("isCorrectNetwork", walletContext.isCorrectNetwork);

  const errorSX =
    (unlocked && walletContext.isConnected && walletContext.isCorrectNetwork) ||
    (!enoughAllowance && !hasAStake) ||
    !hasAStake
      ? {}
      : {
          background: "linear-gradient(45deg, #E6425755 30%, #E64257 90%)",
          backgroundColor: "error.main",
          borderColor: "error.main",
        };

  return (
    <GradientCard
      sx={{
        height: "100%",
        [theme.breakpoints.down("sm")]: {
          pl: 0,
          pr: 0,
        },
      }}
      startColor={startColor}
      endColor={endColor}
    >
      <BuyModal
        level={level}
        stake={farmData?.stake}
        startColor={startColor}
        endColor={endColor}
        open={open}
        setOpen={setOpen}
        balance={farmData?.balance?.data}
        pool={pool}
        min={tierData?.minDeposit}
        max={farmData?.farmData?.data?.pools[level]?.minDeposit}
        tier={tier}
      />
      <CardToken
        title={"Stake" + " ZPT"}
        imgUrl={imageUrl}
        minDeposit={tierData?.minDeposit?.formatted}
        symbol={pool?.token?.symbol}
      />
      <Box sx={{ minHeight: "10px" }} />
      <Grid container spacing={1} sx={{ p: 1 }}>
        <Grid xs={6}>
          <CardDetailsIcon
            sx={{ p: 2 }}
            title={"Your Stake Balance"}
            value={
              tierUserData?.amount?.formatted ? (
                staked + " ZPT"
              ) : !walletContext.isConnected ? (
                "0  ZPT"
              ) : (
                <BarredProgress width={16} />
              )
            }
            dolarValue={
              tierUserData?.amount?.formatted &&
              farmData?.usdPrice?.formatted ? (
                stakedValue
              ) : !walletContext.isConnected ? (
                "0"
              ) : (
                <BarredProgress width={16} />
              )
            }
          />
        </Grid>
        <Grid xs={6}>
          <CardDetailsIcon
            sx={{ p: 2 }}
            title={"Total Earning"}
            value={
              tierRewards?.formatted ? (
                pending + " ZPT"
              ) : !walletContext.isConnected ? (
                "0  ZPT"
              ) : (
                <BarredProgress width={16} />
              )
            }
            dolarValue={
              tierRewards?.formatted && farmData?.usdPrice?.formatted ? (
                pendingValue
              ) : !walletContext.isConnected ? (
                "0"
              ) : (
                <BarredProgress width={16} />
              )
            }
          />
        </Grid>
        <Grid xs={12}>
          <CardDetailsIcon
            sx={{ p: 2 }}
            title={"Balance + Earning"}
            value={
              !isNaN(
                Number(tierUserData?.amount?.formatted) +
                  Number(tierRewards?.formatted)
              ) ? (
                truncNumber(
                  Number(tierUserData?.amount?.formatted) +
                    Number(tierRewards?.formatted),
                  4
                ) + " ZPT"
              ) : !walletContext.isConnected ? (
                "0  ZPT"
              ) : (
                <BarredProgress width={16} />
              )
            }
            dolarValue={
              !isNaN(
                Number(tierUserData?.amount?.formatted) +
                  Number(tierRewards?.formatted)
              ) && farmData?.usdPrice?.formatted ? (
                truncNumber(Number(pendingValue) + Number(stakedValue), 4)
              ) : !walletContext.isConnected ? (
                "0"
              ) : (
                <BarredProgress width={16} />
              )
            }
          />
        </Grid>
        <Grid xs={6}>
          <CardDetailsIcon
            sx={{ p: 2 }}
            title={"Lock Period"}
            value={
              tierData?.lockPeriod?.days
                ? `${tierData?.lockPeriod?.days} Days`
                : "Flexible"
            }
          />
        </Grid>
        <Grid xs={6}>
          <CardDetailsIcon
            sx={{ p: 2 }}
            title={"APY"}
            value={"Earn " + (fetchedAPY ? fetchedAPY : apy) + "%"}
          />
        </Grid>

        <Grid xs={12} sx={{ display: "flex" }}>
          {unlocked && (
            <BlueButton
              busy={busy || open}
              onClick={async () => {
                setBusy(true);
                try {
                  if (walletContext.isConnected) {
                    if (
                      walletContext.isCorrectNetwork &&
                      walletContext.chain.id === pool.chainId
                    ) {
                      // stake or approve
                      if (!enoughAllowance && !hasAStake) {
                        await farmData?.approve?.(walletContext.signer);
                      } else if (!hasAStake) {
                        setOpen(true);
                      } else {
                        const signer = walletContext.signer;
                        if (unlocked) {
                          // withdraw
                          console.error("withdraw");
                          await farmData?.unstake?.(Number(level) - 1, signer);
                        } else {
                          // emergency withdraw
                          console.log("emergency withdraw");
                          //await poolDetails?.emergencyWithdraw?.(level, signer);
                        }
                      }
                    } else {
                      // switch network
                      walletContext.requestSwitchNetwork(
                        getChain(pool.chainId)
                      );
                    }
                  } else {
                    await walletContext.openConnectModal();
                  }
                } catch (e) {
                  enqueueSnackbar(e.reason || "Unknown Error", {
                    variant: "error",
                  });
                } finally {
                  setBusy(false);
                }
              }}
              //animate
              disabled={
                (!canStake && !hasAStake) || farmData?.paused?.data || !unlocked
              }
              sx={{
                //width: "100%",
                margin: "auto",
                mt: 2,
                mb: 2,
                width: "fit-content",
                minWidth: "180px",
                maxWidth: "100%",
                textTransform: "uppercase",
                fontWeight: 700,
                ...errorSX,
              }}
            >
              {walletContext?.isConnected
                ? walletContext.isCorrectNetwork &&
                  walletContext.chain.id == pool.chainId
                  ? enoughAllowance || hasAStake
                    ? hasAStake
                      ? unlocked
                        ? "Withdraw"
                        : "Locked"
                      : farmData?.paused?.data
                      ? "Paused"
                      : "Stake"
                    : farmData?.paused?.data
                    ? "Paused"
                    : "Enable Contract"
                  : "Switch Network"
                : "Connect Wallet"}
            </BlueButton>
          )}
        </Grid>
        {!unlocked && hasAStake && (
          <Grid xs={12}>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2" sx={{ textAlign: "center", mb: 1 }}>
              Unlocks in
            </Typography>
            <CountdownTimer
              date={
                Number(tierUserData?.depositTime?.seconds) +
                Number(tierData?.lockPeriod?.days) * 60 * 60 * 24
              }
            />
          </Grid>
        )}
        {/*penalty > 0 && !unlocked && hasAStake && (
          <Grid xs={12}>
            <Box
              sx={{
                p: 1,
                display: "flex",
                fontWeight: 700,
                color: (theme) => theme.palette.warning.main,
                justifyContent: "center",
                backgroundColor: (theme) =>
                  getColorWithAlpha(theme.palette.error.light, 0.2),
                borderRadius: "4px",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "12px", fontWeight: 700 }}
              >
                {penalty}% Penalty for doing an emergency withdraw
              </Typography>
            </Box>
          </Grid>
        )*/}
      </Grid>
    </GradientCard>
  );
};

FarmCard.propTypes = {
  tier: PropTypes.string.isRequired,
  lockPeriod: PropTypes.string.isRequired,
  apy: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  poolDetails: PropTypes.object.isRequired,
  pool: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
};

export default FarmCard;
