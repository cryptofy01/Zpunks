import useQuery from "../Query/useQuery";
import {
  farmDetails,
  isPaused,
  getUserInfo,
  deposit,
  withdraw,
} from "../../web3Utils/TransplantUtils";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { getChainConstants } from "../../configs/configs";
import useNoSlipagePrice from "../Uniswap/useNoSlipagePrice";
import useERC20Balance from "../Web3/ERC20/useERC20Balance";
import useERC20Allowance from "../Web3/ERC20/useERC20Allowance";
import { erc20ABI } from "../../web3Utils/ERC20Utils";
import { useMemo } from "react";

const useTransplantStaking = ({
  stakingAddress,
  tokenAddress,
  provider,
  user,
  chainId,
}) => {
  const address = stakingAddress;

  const [protocolConfigs, setProtocolConfigs] = useState(
    getChainConstants(chainId)
  );

  useEffect(() => {
    setProtocolConfigs(getChainConstants(chainId));
  }, [chainId]);

  /**
   * @type {{tokenBPrice: unknown, reserves: import("react-query").UseQueryResult<{reserve0, reserve1, blockTimestampLast}, *>, tokenAPrice: unknown}}
   */
  const striptoWbnb = useNoSlipagePrice({
    pairAddress: protocolConfigs?.striptoWBNBLP?.address,
    provider,
    tokenA: protocolConfigs?.stripto?.address,
    tokenB: protocolConfigs?.usdt?.address,
  });

  const usdPrice = useMemo(() => {
    if (!striptoWbnb?.tokenAPrice || !striptoWbnb?.tokenBPrice) return;
    const formatted = {
      value: striptoWbnb.tokenAPrice.value.mul(1000),
      decimals: striptoWbnb.tokenAPrice.decimals,
      formatted: ethers.utils.formatUnits(
        striptoWbnb.tokenAPrice.value.mul(1000), // 1000 USDT
        striptoWbnb.tokenAPrice.decimals
      ),
    };
    return formatted || striptoWbnb.tokenAPrice;
  }, [striptoWbnb.tokenAPrice]);

  const balance = useERC20Balance({
    tokenAddress: tokenAddress,
    provider,
    userAddress: user,
  });

  /**
   * @type {{isLoadingError: boolean, errorUpdateCount: number, data: ({formatted: *, decimals: *, value: BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{formatted: *, decimals: *, value: BigNumber}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}}
   */
  const allowance = useERC20Allowance({
    tokenAddress: tokenAddress,
    provider,
    ownerAddress: user,
    spenderAddress: address,
  });

  /**
   * @type {import('react-query').UseQueryResult<{totalVotingPower: {formatted: string, decimals: BigNumber, value: BigNumber}, decimals: number, pools: {votingWeight: *, lockPeriod: {seconds: *, days}, totalEstimatedRewards: {formatted: *, decimals: BigNumber, value: *}, minDeposit: {formatted: *, decimals: BigNumber, value: *}, apy: *, totalStaked: {formatted: *, decimals: BigNumber, value: *}}[], totalStaked: {formatted: string, decimals: BigNumber, value: BigNumber}, token: string, totalRewards: {formatted: string, decimals: BigNumber, value: BigNumber}}, unknown>}
   */
  const farmData = useQuery(
    ["farmData", stakingAddress],
    async () => {
      const data = await farmDetails({ address: stakingAddress, provider });
      if (!data) return null;
      /**
       * @type {{totalVotingPower: {formatted: string, decimals: BigNumber, value: BigNumber}, decimals: number, pools: {votingWeight: *, lockPeriod: {seconds: *, days}, totalEstimatedRewards: {formatted: *, decimals: BigNumber, value: *}, minDeposit: {formatted: *, decimals: BigNumber, value: *}, apy: *, totalStaked: {formatted: *, decimals: BigNumber, value: *}}[], totalStaked: {formatted: string, decimals: BigNumber, value: BigNumber}, token: string, totalRewards: {formatted: string, decimals: BigNumber, value: BigNumber}}}
       */
      const formattedData = {
        totalStaked: {
          value: data.totalStaked,
          formatted: ethers.utils.formatUnits(data.totalStaked, data.decimals),
          decimals: data.decimals,
        },
        token: data.token,
        decimals: Number(data.decimals),
        totalRewards: {
          value: data.totalRewards,
          formatted: ethers.utils.formatUnits(data.totalRewards, data.decimals),
          decimals: data.decimals,
        },
        totalVotingPower: {
          value: data.totalVotingPower,
          formatted: ethers.utils.formatUnits(
            data.totalVotingPower,
            data.decimals
          ),
          decimals: data.decimals,
        },
        pools: data.pools.map((pool) => ({
          totalStaked: {
            value: pool.totalStaked,
            formatted: ethers.utils.formatUnits(
              pool.totalStaked,
              data.decimals
            ),
            decimals: data.decimals,
          },
          minDeposit: {
            value: pool.minDeposit,
            formatted: ethers.utils.formatUnits(pool.minDeposit, data.decimals),
            decimals: data.decimals,
          },
          lockPeriod: {
            seconds: pool.lockPeriod,
            days: pool.lockPeriod / 86400,
          },
          votingWeight: pool.votingWeight,
          apy: pool.apy,
          totalEstimatedRewards: {
            value: pool.totalEstimatedRewards,
            formatted: ethers.utils.formatUnits(
              pool.totalEstimatedRewards,
              data.decimals
            ),
            decimals: data.decimals,
          },
        })),
        // .filter((p, i) => i < 2),
      };
      return formattedData;
    },
    {
      enabled: !!stakingAddress && !!provider,
      refetchInterval: 180000,
    }
  );

  /**
   * @type {import('react-query').UseQueryResult<boolean, unknown>}
   */
  const paused = useQuery(
    ["isPaused", stakingAddress],
    async () => {
      return await isPaused({ address: stakingAddress, provider });
    },
    {
      enabled: !!stakingAddress && !!provider,
    }
  );

  /**
   * @type {import('react-query').UseQueryResult<{votingPower: {formatted: string, decimals: number, value: BigNumber}, estimatedRewards: {formatted: *, decimals: number, value: *}[], totalStaked: {formatted: string, decimals: number, value: BigNumber}, deposits: {amount: {formatted: *, decimals: number, value: *}, depositTime: {date: *, seconds: *}}[], historicalRewards: {formatted: string, decimals: number, value: BigNumber}, totalRewards: {formatted: string, decimals: number, value: BigNumber}}, unknown>}
   */
  const userData = useQuery(
    ["userData", stakingAddress, user],
    async () => {
      /**
       * @type {{historicalRewards:BigNumber, votingPower: BigNumber, estimatedRewards: [BigNumber,BigNumber,BigNumber], totalStaked: BigNumber, deposits: Array<{amount: BigNumber, depositTime: BigNumber}>, totalRewards: BigNumber}}
       */
      const useData = await getUserInfo({
        address: stakingAddress,
        user,
        provider,
      });

      /**
       * @type {{votingPower: {formatted: string, decimals: number, value: BigNumber}, estimatedRewards: {formatted: *, decimals: number, value: *}[], totalStaked: {formatted: string, decimals: number, value: BigNumber}, deposits: {amount: {formatted: *, decimals: number, value: *}, depositTime: {date: *, seconds: *}}[], historicalRewards: {formatted: string, decimals: number, value: BigNumber}, totalRewards: {formatted: string, decimals: number, value: BigNumber}}}
       */
      const formattedData = {
        totalStaked: {
          value: useData.totalStaked,
          formatted: ethers.utils.formatUnits(
            useData.totalStaked,
            farmData.data.decimals
          ),
          decimals: farmData.data.decimals,
        },
        historicalRewards: {
          value: useData.historicalRewards,
          formatted: ethers.utils.formatUnits(
            useData.historicalRewards,
            farmData.data.decimals
          ),
          decimals: farmData.data.decimals,
        },
        estimatedRewards: useData.estimatedRewards.map((reward) => ({
          value: reward,
          formatted: ethers.utils.formatUnits(reward, farmData.data.decimals),
          decimals: farmData.data.decimals,
        })),
        votingPower: {
          value: useData.votingPower,
          formatted: ethers.utils.formatUnits(
            useData.votingPower,
            farmData.data.decimals
          ),
          decimals: farmData.data.decimals,
        },
        totalRewards: {
          value: useData.totalRewards,
          formatted: ethers.utils.formatUnits(
            useData.totalRewards,
            farmData.data.decimals
          ),
          decimals: farmData.data.decimals,
        },
        deposits: useData.deposits.map((deposit) => ({
          amount: {
            value: deposit.amount,
            formatted: ethers.utils.formatUnits(
              deposit.amount,
              farmData.data.decimals
            ),
            decimals: farmData.data.decimals,
          },
          depositTime: {
            seconds: deposit.depositTime,
            date: new Date(deposit.depositTime * 1000),
          },
        })),
      };

      return formattedData;
    },
    {
      enabled: !!stakingAddress && !!provider && !!user && !!farmData.data,
    }
  );

  const approve = useCallback(
    async (signer) => {
      const erc20 = new ethers.Contract(tokenAddress, erc20ABI, signer);
      const tx = await erc20
        .approve(stakingAddress, ethers.constants.MaxUint256)
        .catch((e) => {
          console.error(e);
        });

      const tr = await tx.wait();

      await allowance.refetch();

      return tr;
    },
    [stakingAddress, tokenAddress]
  );

  const stake = useCallback(
    async (tier, amount, signer) => {
      const tx = await deposit({
        address: stakingAddress,
        signer,
        tier,
        amount,
      });
      const tr = await tx.wait();

      await userData.refetch();
      await farmData.refetch();
      await allowance.refetch();
      await balance.refetch();

      return tr;
    },
    [stakingAddress]
  );

  const unstake = useCallback(
    async (tier, signer) => {
      const tx = await withdraw({
        address: stakingAddress,
        signer,
        tier,
      });
      const tr = await tx.wait();

      await userData.refetch();
      await farmData.refetch();
      await allowance.refetch();
      await balance.refetch();

      return tr;
    },
    [stakingAddress]
  );

  return {
    farmData,
    balance,
    allowance,
    usdPrice,
    paused,
    userData,
    approve,
    stake,
    unstake,
  };
};

export default useTransplantStaking;
