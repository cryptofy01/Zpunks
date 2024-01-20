import usePairReserves from "./usePairReserves";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import uniPairGetTokenOrder from "../../web3Utils/pairUtils/UniPairGetTokenOrder";
import useERC20MultiDecimals from "../Web3/ERC20/useERC20MultiDecimals";

const useNoSlipagePrice = ({ pairAddress, provider, tokenA, tokenB }) => {
  const [token0, token1] = uniPairGetTokenOrder(tokenA, tokenB);

  const decimals = useERC20MultiDecimals({
    tokenAddresses: [tokenA, tokenB],
    provider,
  });

  console.log("decimals", decimals);

  const reserves = usePairReserves({ address: pairAddress, provider });

  const [tokenAPrice, setTokenAPrice] = useState(undefined);
  const [tokenBPrice, setTokenBPrice] = useState(undefined);

  useEffect(() => {
    const decimal0 = decimals.getDecimal(token0);
    const decimalA = decimals.getDecimal(tokenA);
    const decimal1 = decimals.getDecimal(token1);
    const decimalB = decimals.getDecimal(tokenB);

    if (reserves.data && !!decimal0 && !!decimal1) {
      const { reserve0, reserve1 } = reserves.data;
      if (reserve0 == 0 || reserve1 == 0) {
        setTokenAPrice({
          value: BigNumber.from(0),
          formatted: ethers.utils.formatUnits(BigNumber.from(0), decimalA),
          decimals: decimalA,
        });

        setTokenBPrice({
          value: BigNumber.from(0),
          formatted: ethers.utils.formatUnits(BigNumber.from(0), decimalB),
          decimals: decimalB,
        });
        return;
      }
      BigNumber.from(10).toBigInt();
      let priceA;
      let priceB;
      if (token0 == tokenA) {
        // means tokenA is 0 and tokenB is 1
        // price of tokenA in token2 will be

        priceA = reserve1.mul(BigNumber.from("10").pow(decimal0)).div(reserve0);
        priceB = reserve0.mul(BigNumber.from("10").pow(decimal1)).div(reserve1);
      } else {
        priceA = reserve0.mul(BigNumber.from("10").pow(decimal1)).div(reserve1);
        priceB = reserve1.mul(BigNumber.from("10").pow(decimal0)).div(reserve0);
      }
      setTokenAPrice({
        value: priceA,
        formatted: ethers.utils.formatUnits(priceA, decimalA),
        decimals: decimalA,
      });

      setTokenBPrice({
        value: priceB,
        formatted: ethers.utils.formatUnits(priceB, decimalB),
        decimals: decimalB,
      });
    }
  }, [
    provider,
    reserves.data?.reserve0,
    reserves.data?.reserve1,
    decimals.decimals.isSuccess,
  ]);

  return {
    reserves,
    tokenAPrice,
    tokenBPrice,
  };
};

export default useNoSlipagePrice;
