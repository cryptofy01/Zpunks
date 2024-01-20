import Page from "../../components/Page";
import BreadCrumbs from "../../components/BreadCrumbs";
import Container from "@mui/material/Container";
import CardDark from "../../components/Cards/CardDark";
import Box from "@mui/material/Box";
import { Grid, useTheme } from "@mui/material";
import BlueButton from "../../components/Buttons/BlueButton";
import CircleIconButton from "../../components/Buttons/CircleIconButton";
import ProjectHeading from "./ProjectHeading";
import FeatherIcon from "feather-icons-react";
import QuoteBlock from "../../components/Typography/QuoteBlock";
import DetailsCard from "../../components/Cards/DetailsCard";
import LightCard from "../../components/Cards/LightCard";
import CardDetailsIcon from "../../components/Cards/CardDetailsIcon";
import FarmCard from "./FarmCard";
import useWalletContext from "../../hooks/useWalletContext";
import { useEffect } from "react";
import { getPools } from "../../configs/configs";
import BarredProgress from "../../components/Progress/BarredProgress";
import {
  eToNumber,
  truncNumber,
  truncNumberNoFormating,
} from "../../utils/NumberUtils/formatNumbers";
import Typography from "@mui/material/Typography";
import { getChain } from "../../web3Utils/ChainUtils/chainList";
import { ethers } from "ethers";
import useTransplantStaking from "../../hooks/TransplantStaking/useTransplantStaking";

const stripToken = new URL(
  "../../../public/output.png?as=webp&width=64",
  import.meta.url
).href;

const imgUrl = new URL(
  "../../../public/logo-no-text.png?as=webp&width=74",
  import.meta.url
).href;

const HomePage = () => {
  const validId = 137;
  const theme = useTheme();
  const walletContext = useWalletContext();
  const simpleRPC = new ethers.providers.StaticJsonRpcProvider(
    getChain(validId).rpcUrl
  );
  simpleRPC._network = {
    chainId: walletContext.chain.id,
    name: walletContext.chain.name,
  };
  const pool = getPools(validId);

  console.log("pool", pool);
  console.log("walletContext", walletContext.chain.id);
  /**
   *
   * @type {{paused: import('react-query').UseQueryResult<boolean, *>, userData: import('react-query').UseQueryResult<{votingPower: {formatted: string, decimals: number, value: BigNumber.BigNumber}, estimatedRewards: {formatted: *, decimals: number, value: *}[], totalStaked: {formatted: string, decimals: number, value: BigNumber.BigNumber}, deposits: {amount: {formatted: *, decimals: number, value: *}, depositTime: {date: *, seconds: *}}[], historicalRewards: {formatted: string, decimals: number, value: BigNumber.BigNumber}, totalRewards: {formatted: string, decimals: number, value: BigNumber.BigNumber}}, *>, balance: {isLoadingError: boolean, errorUpdateCount: number, data: ({value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{amount: BigNumber, formatted: *, decimals: *}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, usdPrice: undefined, allowance: {isLoadingError: boolean, errorUpdateCount: number, data: ({formatted: *, decimals: *, value: BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{formatted: *, decimals: *, value: BigNumber}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, farmData: import('react-query').UseQueryResult<{totalVotingPower: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}, decimals: number, pools: {votingWeight: *, lockPeriod: {seconds: *, days}, totalEstimatedRewards: {formatted: *, decimals: BigNumber.BigNumber, value: *}, minDeposit: {formatted: *, decimals: BigNumber.BigNumber, value: *}, apy: *, totalStaked: {formatted: *, decimals: BigNumber.BigNumber, value: *}}[], totalStaked: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}, token: string, totalRewards: {formatted: string, decimals: BigNumber.BigNumber, value: BigNumber.BigNumber}}, *>}}
   */
  const farmData = useTransplantStaking({
    stakingAddress: pool?.poolAddress,
    tokenAddress: pool?.token?.address,
    chainId: walletContext.chain.id,
    provider: walletContext?.provider || simpleRPC,
    user: walletContext?.address,
  });

  useEffect(() => {
    console.log("farmData", farmData);
  }, [farmData]);

  if (!pool) {
    return (
      <Page title={"Home"}>
        <BreadCrumbs
          path={[
            { title: "Home", href: "" },
            { title: "Zpunk Token Staking", href: "/" },
          ]}
        />
        <Container
          maxWidth={"lg"}
          sx={{
            p: "4px",
            pt: "2.5rem",
            pb: "2.5rem",
          }}
        >
          <Typography variant={"h4"}>
            No pool available for this network
          </Typography>
        </Container>
      </Page>
    );
  }

  const historicalClaimValue =
    Number(farmData?.userData?.data?.historicalRewards?.formatted) *
    Number(farmData?.usdPrice?.formatted);

  return (
    <Page title={"Home"}>
      {false && (
        <BreadCrumbs
          path={[
            { title: "Home", href: "" },
            { title: "Zpunk Token Staking", href: "/" },
          ]}
        />
      )}
      <Container
        maxWidth={"lg"}
        sx={{
          p: "4px",
          pt: "2.5rem",
          pb: "2.5rem",
        }}
      >
        <CardDark
          sx={{
            p: 2,
            minHeight: "300px",
            [theme.breakpoints.down("sm")]: {
              p: 1,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              [theme.breakpoints.down("sm")]: {
                //flexDirection: 'column',
              },
            }}
          >
            <ProjectHeading
              imgUrl={imgUrl}
              title={"Zpunk Token"}
              subtitle={"$ZPT"}
            />
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "0.5em",
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              <CircleIconButton
                onClick={() => {
                  window.open("https://twitter.com/zpunksnfts", "_blank");
                }}
                icon={<FeatherIcon size={12} icon={"twitter"} />}
              />
              <CircleIconButton
                onClick={() => {
                  window.open("https://zpunks.online/", "_blank");
                }}
                icon={<FeatherIcon size={12} icon={"globe"} />}
              />
              <CircleIconButton
                onClick={() => {
                  window.open("https://www.instagram.com/zpunksnfts", "_blank");
                }}
                icon={<FeatherIcon size={12} icon={"instagram"} />}
              />
              <CircleIconButton
                onClick={() => {
                  window.open("https://t.me/Zpunks_Support", "_blank");
                }}
                icon={<FeatherIcon size={12} icon={"send"} />}
              />
            </Box>
            <BlueButton
              onClick={() => {
                window.open(
                  "https://quickswap.exchange/#/swap?currency0=ETH&currency1=0xE09473eD3C1D317D3601290AE7bC511d7E16e62f&swapIndex=0",
                  "_blank"
                );
              }}
            >
              BUY $ZPT
            </BlueButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              mb: 1,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            <DetailsCard
              sx={{
                width: "fit-content",
                minWidth: "20%",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
              title={"ZPT/USD Price"}
              value={
                farmData.usdPrice?.formatted ? (
                  truncNumberNoFormating(
                    Number(farmData.usdPrice?.formatted),
                    10
                  )
                ) : (
                  <BarredProgress width={24} />
                ) /* TODO: implement  */
              }
            />
            <DetailsCard
              sx={{
                width: "fit-content",
                minWidth: "20%",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
              title={"Your Balance"}
              value={
                farmData.balance.data ? (
                  `${truncNumber(farmData.balance.data?.formatted, 4)} ZPT`
                ) : !walletContext.isConnected ? (
                  "0  ZPT"
                ) : (
                  <BarredProgress width={24} />
                )
              }
            />
            <DetailsCard
              sx={{
                width: "fit-content",
                minWidth: "20%",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
              title={"Your Balance (in USD)"}
              value={
                farmData.usdPrice?.formatted && farmData.balance.data?.formatted
                  ? `$${truncNumber(
                      Number(farmData.usdPrice?.formatted) *
                        Number(farmData.balance.data?.formatted),
                      4
                    )} USD`
                  : !walletContext.isConnected
                  ? "0  USD"
                  : <BarredProgress width={24} /> || "$0 USD"
              }
            />
          </Box>

          <QuoteBlock
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            Zpunk Token is the first utility to be introduced as the currency in
            the Zpunks project. They are used to reward Zpunks NFT holders.
            Zpunk Token is not only a utility token but also a governance token
            of the ZPunks Project, the more Zpunk Tokens you have, the more
            authority and influence you have for future roadmap and features.
          </QuoteBlock>

          <LightCard
            sx={{
              mg: 2,
              p: 2,
              [theme.breakpoints.down("sm")]: {
                p: 1,
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <CardDetailsIcon
                  icon={<FeatherIcon icon={"target"} />}
                  value={
                    farmData?.userData?.data?.totalRewards?.formatted ||
                    Number(farmData?.userData?.data?.totalRewards?.formatted) ==
                      0 ? (
                      truncNumber(
                        farmData?.userData?.data?.totalRewards?.formatted,
                        4
                      ) + " ZPT"
                    ) : !walletContext.isConnected ? (
                      "0  ZPT"
                    ) : (
                      <BarredProgress width={24} />
                    )
                  }
                  title={"Total Earning"}
                  tooltip={"Total earned from all Pools"}
                  dolarValue={
                    farmData.usdPrice?.formatted &&
                    (farmData?.userData?.data?.totalRewards?.formatted ||
                      Number(
                        farmData?.userData?.data?.totalRewards?.formatted
                      ) == 0) ? (
                      truncNumber(
                        Number(
                          farmData?.userData?.data?.totalRewards?.formatted
                        ) * Number(farmData.usdPrice?.formatted),
                        4
                      )
                    ) : !walletContext.isConnected ? (
                      "0"
                    ) : (
                      <BarredProgress width={24} />
                    )
                  }
                />
              </Grid>
              {
                <Grid item xs={12} sm={6} md={3}>
                  <CardDetailsIcon
                    icon={<FeatherIcon icon={"target"} />}
                    value={
                      farmData?.userData?.data?.historicalRewards?.formatted ||
                      farmData?.userData?.data?.historicalRewards?.value ==
                        0 ? (
                        truncNumber(
                          eToNumber(
                            farmData?.userData?.data?.historicalRewards
                              ?.formatted
                          ),
                          4
                        ) + " ZPT"
                      ) : !walletContext.isConnected ? (
                        "0  ZPT"
                      ) : (
                        <BarredProgress width={24} />
                      )
                    }
                    title={"Total Earning Claimed"}
                    tooltip={"Total earnings claimed from all Pools"}
                    dolarValue={
                      (historicalClaimValue || historicalClaimValue === 0) &&
                      !isNaN(historicalClaimValue) &&
                      !isNaN(historicalClaimValue) ? (
                        truncNumber(historicalClaimValue, 4)
                      ) : !walletContext.isConnected ? (
                        "0"
                      ) : (
                        <BarredProgress width={24} />
                      )
                    }
                  />
                </Grid>
              }
            </Grid>

            {/* Staking Cards */}
            {
              <Grid
                container
                sx={{ mt: 2, pt: 2, mb: 2 }}
                columnSpacing={2}
                justifyContent={"center"}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <FarmCard
                    poolDetails={farmData}
                    pool={pool}
                    level={1}
                    tier={"Bronze"}
                    lockPeriod={"Flexible"}
                    apy={""}
                    imageUrl={stripToken}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FarmCard
                    poolDetails={farmData}
                    pool={pool}
                    level={2}
                    tier={"Silver"}
                    lockPeriod={""}
                    apy={""}
                    imageUrl={stripToken}
                  />
                </Grid>

                {/*<Grid item xs={12} sm={6} md={4}>
                  <FarmCard
                    poolDetails={farmData}
                    pool={pool}
                    level={3}
                    tier={"Gold"}
                    lockPeriod={""}
                    apy={""}
                    imageUrl={stripToken}
                  />
            </Grid>*/}
              </Grid>
            }
          </LightCard>
        </CardDark>
      </Container>
    </Page>
  );
};

export default HomePage;
