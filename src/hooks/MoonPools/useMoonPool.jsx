import MoonPool from "../../web3Utils/MoonPools/MoonPool";
import useQuery from "../Query/useQuery";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useERC20Balance from "../Web3/ERC20/useERC20Balance";
import useERC20Allowance from "../Web3/ERC20/useERC20Allowance";
import { getChainConstants } from "../../configs/configs";
import useNoSlipagePrice from "../Uniswap/useNoSlipagePrice";
import { erc20ABI } from "../../web3Utils/ERC20Utils";

/**
 *
 * @param pool {{tiers: number[], poolAddress: string, poolName: string, token: {symbol: string, address: string, decimals: string, name: string}}}
 * @param provider {import("@ethersproject/providers").Web3Provider}
 * @param user {string}
 * @param chainId {number}
 * @returns {{minAmount: UseQueryResult<{formatted: *, decimals: *, value: BigNumber}, unknown>, allLevelDetails: UseQueryResult<{amount: {formatted: *, decimals: string, value: *}, initialTime: {date: *, value: number}, level: number, pendingRewards: {formatted: *, decimals: string, value: *}, endTime: {date: *, value: number}, rewardAmount: {formatted: *, decimals: string, value: *}, withdrawAmount: {formatted: *, decimals: string, value: *}, isActive: *}[], *>, totalEarned: undefined, penalty: UseQueryResult<number, unknown>, totalUserStaked: undefined, allowance: {isLoadingError: boolean, errorUpdateCount: number, data: ({formatted: *, decimals: *, value: BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{formatted: *, decimals: *, value: BigNumber}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, emergencyWithdraw: (function(*, *): Promise<*>), stake: (function(*, *, *): Promise<*>), TiersDetails: UseQueryResult<{lockPeriod: number, apy: number}[], *>, balance: {isLoadingError: boolean, errorUpdateCount: number, data: ({value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{amount: BigNumber, formatted: *, decimals: *}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, usdPrice: undefined, totalPending: undefined, maxAmount: UseQueryResult<{formatted: *, decimals: *, value: BigNumber}, unknown>, withdraw: (function(*, *): Promise<*>)}}
 */
const useMoonPool = ({ pool, provider, user, chainId }) => {
  const address = pool?.poolAddress;

  const [protocolConfigs, setProtocolConfigs] = useState(
    getChainConstants(chainId)
  );

  useEffect(() => {
    setProtocolConfigs(getChainConstants(chainId));
  }, [chainId]);

  const wbnbUsdt = useNoSlipagePrice({
    pairAddress: protocolConfigs?.wbnbUsdtLP?.address,
    provider,
    tokenA: protocolConfigs?.wbnb?.address,
    tokenB: protocolConfigs?.usdt?.address,
  });

  const striptoWbnb = useNoSlipagePrice({
    pairAddress: protocolConfigs?.striptoWBNBLP?.address,
    provider,
    tokenA: protocolConfigs?.stripto?.address,
    tokenB: protocolConfigs?.wbnb?.address,
  });

  const [usdPrice, setUsdPrice] = useState();

  useEffect(() => {
    if (wbnbUsdt?.tokenAPrice?.value && striptoWbnb.tokenAPrice?.value) {
      const price = wbnbUsdt?.tokenAPrice?.value
        .mul(striptoWbnb?.tokenAPrice.value)
        .div(ethers.BigNumber.from(10).pow(protocolConfigs.wbnb.decimals));
      setUsdPrice({
        value: price,
        formatted: ethers.utils.formatUnits(
          price,
          protocolConfigs.usdt.decimals
        ),
        decimals: protocolConfigs.usdt.decimals,
      });
    } else {
      setUsdPrice(undefined);
    }
  }, [wbnbUsdt?.tokenAPrice?.formatted, striptoWbnb?.tokenAPrice?.formatted]);

  const balance = useERC20Balance({
    tokenAddress: pool?.token?.address,
    provider,
    userAddress: user,
  });

  const allowance = useERC20Allowance({
    tokenAddress: pool?.token?.address,
    provider,
    ownerAddress: user,
    spenderAddress: address,
  });

  const maxAmount = useQuery(
    [address, "maxAmount", provider?._network?.chainId],
    async () => {
      const max = await MoonPool.getMaxTxAmount({ address, provider });
      return {
        value: max,
        formatted: ethers.utils.formatUnits(max, pool.token.decimals),
        decimals: pool.token.decimals,
      };
    },
    {
      enabled: !!address && !!provider,
    }
  );

  const minAmount = useQuery(
    [address, "minAmount"],
    async () => {
      const min = await MoonPool.getMinTxAmount({ address, provider });
      return {
        value: min,
        formatted: ethers.utils.formatUnits(min, pool.token.decimals),
        decimals: pool.token.decimals,
      };
    },
    {
      enabled: !!address && !!provider && !!user,
    }
  );

  /**
   * @type {UseQueryResult<[{lockPeriod: number, apy: number}], unknown>}
   */
  const TiersDetails = useQuery(
    [address, "poolDetails"],
    async () => {
      /**
       *
       * @type {[{lockPeriod: import('ethers').BigNumber, apy: import('ethers').BigNumber},{lockPeriod: import('ethers').BigNumber, apy: import('ethers').BigNumber},{lockPeriod: import('ethers').BigNumber, apy: import('ethers').BigNumber}]}
       */
      const details = await MoonPool.getAllTiersDetails({ address, provider });

      const formatted = details.map((detail) => {
        return {
          apy: Number(detail.apy),
          lockPeriod: Number(detail.lockPeriod),
        };
      });

      return formatted;
    },
    {
      enabled: !!address && !!provider,
    }
  );

  const penalty = useQuery(
    [address, "penalty"],
    async () => {
      const penalty = await MoonPool.getPenalty({ address, provider });
      return Number(penalty);
    },
    {
      enabled: !!address && !!provider,
    }
  );

  /**
   *
   * @type {UseQueryResult<{amount: {formatted: *, decimals: string, value: *}, initialTime: {date: *, value: number}, level: number, pendingRewards: {formatted: *, decimals: string, value: *}, endTime: {date: *, value: number}, rewardAmount: {formatted: *, decimals: string, value: *}, withdrawAmount: {formatted: *, decimals: string, value: *}, isActive: *}[], unknown>}
   */
  const allLevelDetails = useQuery(
    [address, "allLevelDetails", user],
    async () => {
      /**
       * @type {Awaited<{level: import('ethers').BigNumber, amount: import('ethers').BigNumber, initialTime: import('ethers').BigNumber, endTime: import('ethers').BigNumber, rewardAmount: import('ethers').BigNumber, withdrawAmount: import('ethers').BigNumber, isActive: boolean, pendingRewards: import('ethers').BigNumber}>[]}
       */
      const details = await MoonPool.getAllLevelDetails({
        address,
        provider,
        userAddress: user,
        tiers: pool.tiers,
      });

      return details.map((detail) => {
        return {
          level: Number(detail.level),
          amount: {
            value: detail.amount,
            formatted: ethers.utils.formatUnits(
              detail.amount,
              pool.token.decimals
            ),
            decimals: pool.token.decimals,
          },
          initialTime: {
            value: Number(detail.initialTime),
            date: new Date(Number(detail.initialTime) * 1000),
          },
          endTime: {
            value: Number(detail.endTime),
            date: new Date(Number(detail.endTime) * 1000),
          },
          rewardAmount: {
            value: detail.rewardAmount,
            formatted: ethers.utils.formatUnits(
              detail.rewardAmount,
              pool.token.decimals
            ),
            decimals: pool.token.decimals,
          },
          withdrawAmount: {
            value: detail.withdrawAmount,

            formatted: ethers.utils.formatUnits(
              detail.withdrawAmount,
              pool.token.decimals
            ),
            decimals: pool.token.decimals,
          },
          isActive: detail.isActive,
          pendingRewards: {
            value: detail.pendingRewards,
            formatted: ethers.utils.formatUnits(
              detail.pendingRewards,
              pool.token.decimals
            ),
            decimals: pool.token.decimals,
          },
        };
      });
    },
    {
      enabled: !!address && !!provider && !!user,
    }
  );

  const [totalUserStaked, setTotalUserStaked] = useState();
  const [totalEarned, setTotalEarned] = useState();
  const [totalPending, setTotalPending] = useState();

  useEffect(() => {
    if (allLevelDetails?.data) {
      let staked = 0;
      let earned = 0;
      let pending = 0;
      allLevelDetails.data.forEach((detail) => {
        console.log(detail);
        staked += Number(detail.amount.formatted);
        earned += Number(detail.rewardAmount.formatted);
        pending += Number(detail.pendingRewards.formatted);
      });
      setTotalUserStaked(staked);
      setTotalEarned(earned);
      setTotalPending(pending);
    } else {
      setTotalEarned(undefined);
      setTotalPending(undefined);
      setTotalUserStaked(undefined);
    }
  }, [allLevelDetails?.data]);

  const approve = async (signer) => {
    const erc20 = new ethers.Contract(pool.token.address, erc20ABI, signer);
    const tx = await erc20.approve(address, ethers.constants.MaxUint256);

    const tr = await tx.wait();

    await allowance.refetch();

    return tr;
  };

  const stake = useCallback(
    async (amount, level, signer) => {
      console.log("level", signer);
      const tx = await MoonPool.stake({ amount, tier: level, address, signer });
      const tr = await tx.wait();

      await allLevelDetails.refetch();
      await allowance.refetch();
      await balance.refetch();
      return tr;
    },
    [address, allLevelDetails, allowance, balance]
  );

  const withdraw = useCallback(
    async (level, signer) => {
      const tx = await MoonPool.withdraw({ tier: level, address, signer });
      const tr = await tx.wait();

      await allLevelDetails.refetch();
      //await allowance.refetch();
      await balance.refetch();
      return tr;
    },
    [address, allLevelDetails, allowance, balance]
  );

  const emergencyWithdraw = useCallback(
    async (level, signer) => {
      const tx = await MoonPool.emergencyWithdraw({
        tier: level,
        address,
        signer,
      });
      const tr = await tx.wait();

      await allLevelDetails.refetch();
      //await allowance.refetch();
      await balance.refetch();
      return tr;
    },
    [address, allLevelDetails, allowance, balance]
  );

  return {
    maxAmount,
    minAmount,
    TiersDetails,
    penalty,
    allLevelDetails,
    balance,
    allowance,
    totalUserStaked,
    totalEarned,
    totalPending,
    usdPrice,
    stake,
    withdraw,
    emergencyWithdraw,
    approve,
  };
};

export default useMoonPool;
