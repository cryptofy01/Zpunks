/**
 * @type {{tiers: number[], poolAddress: string, poolName: string, token: {symbol: string, address: string, decimals: string, name: string}}}
 */
const goerliPool = {
  chainId: 5,
  poolAddress: "0xEd7D70Fd985E9d4631c8558e8fDf6d77941f45b9",
  poolName: "Zpunk Token",
  token: {
    address: "0x0b922ead77E16f0182681c44DC25bA73D6C95D23",
    name: "Zpunk Token",
    symbol: "ZPT",
    decimals: "18",
  },
  tiers: [1, 2, 3],
};

/**
 * @type {{tiers: number[], poolAddress: string, poolName: string, token: {symbol: string, address: string, decimals: string, name: string}}}
 */
const bscPool = {
  chainId: 56,
  poolAddress: "0xF37A9caAc0238f9B09dc2c282FBADf5ddd01ad19",
  poolName: "Zpunk Token",
  token: {
    address: "0xD8405d25f108a0Dd6db68082F1554f08eA6794f3",
    name: "Zpunk Token",
    symbol: "ZPT",
    decimals: "18",
  },
  tiers: [1, 2, 3],
};

/**
 * @type {{tiers: number[], poolAddress: string, poolName: string, token: {symbol: string, address: string, decimals: string, name: string}}}
 */
const polyPool = {
  chainId: 137,
  poolAddress: "0x4CADd993b4735bB3a15eAC32d92DE8D0Ad4477c5",
  poolName: "Zpunk Token",
  token: {
    address: "0xE09473eD3C1D317D3601290AE7bC511d7E16e62f",
    name: "Zpunk Token",
    symbol: "ZPT",
    decimals: "9",
  },
  tiers: [1, 2],
};

const striptoPools = {
  5: goerliPool,
  56: bscPool,
  137: polyPool,
};
/**
 * @type {{factory: string, router: string, stripto: {symbol: string, address: string, decimals: number, name: string}, wbnb: {symbol: string, address: string, decimals: number, name: string}, usdt: {symbol: string, address: string, decimals: number, name: string}, wbnbUsdtLP: {symbol: string, address: string, decimals: number, name: string}, striptoWBNBLP: {symbol: string, address: string, decimals: number, name: string}}}
 */
export const goerliConstants = {
  router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  wbnb: {
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    symbol: "WBNB",
    name: "Wrapped Ether",
    decimals: 18,
  },
  usdt: {
    address: "0xA61D4858b6171a47f5b6478Ce37bE643B52101Cf",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 18,
  },
  stripto: {
    address: "0x0b922ead77E16f0182681c44DC25bA73D6C95D23",
    symbol: "ZPT",
    name: "Zpunk Token",
    decimals: 18,
  },
  wbnbUsdtLP: {
    address: "0x2A5085C4c40a9Ce02f0a0C6851767Cf37756797D",
    symbol: "WBNB-USDT",
    name: "WBNB-USDT",
    decimals: 18,
  },
  striptoWBNBLP: {
    address: "0x143c6e59F1b7256CA244b7534827f204D97882de",
    symbol: "ZPT-WBNB",
    name: "ZPT-WBNB",
    decimals: 18,
  },
};

export const bscConstants = {
  router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  wbnb: {
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    symbol: "WBNB",
    name: "Wrapped Ether",
    decimals: 18,
  },
  usdt: {
    address: "0x55d398326f99059fF775485246999027B3197955",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 18,
  },
  stripto: {
    address: "0xD8405d25f108a0Dd6db68082F1554f08eA6794f3",
    symbol: "ZPT",
    name: "Zpunk Token",
    decimals: 18,
  },
  wbnbUsdtLP: {
    address: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    symbol: "WBNB-USDT",
    name: "WBNB-USDT",
    decimals: 18,
  },
  striptoWBNBLP: {
    address: "0xabB51907749B6690732A9eEF67497c28AF1990f5",
    symbol: "ZPT-WBNB",
    name: "ZPT-WBNB",
    decimals: 18,
  },
};

export const polygonConstants = {
  router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  wbnb: {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    symbol: "WMATIC",
    name: "Wrapped Matic",
    decimals: 18,
  },
  usdt: {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
  },
  stripto: {
    address: "0xE09473eD3C1D317D3601290AE7bC511d7E16e62f",
    symbol: "ZPT",
    name: "Zpunk Token",
    decimals: 18,
  },
  wbnbUsdtLP: {
    address: "0x604229c960e5CACF2aaEAc8Be68Ac07BA9dF81c3",
    symbol: "WMATIC-USDT",
    name: "WMATIC-USDT",
    decimals: 18,
  },
  striptoWBNBLP: {
    address: "0x77A4f1Bf89618D458441bA6A942e0F3857B458Cf",
    symbol: "ZPT-USDT",
    name: "ZPT-USDT",
    decimals: 18,
  },
};

const chainConstants = {
  5: goerliConstants,
  56: bscConstants,
  137: polygonConstants,
};

/**
 *
 * @param chainId
 * @returns {{factory: string, router: string, stripto: {symbol: string, address: string, decimals: number, name: string}, wbnb: {symbol: string, address: string, decimals: number, name: string}, usdt: {symbol: string, address: string, decimals: number, name: string}, wbnbUsdtLP: {symbol: string, address: string, decimals: number, name: string}, striptoWBNBLP: {symbol: string, address: string, decimals: number, name: string}}}
 */
export const getChainConstants = (chainId) => {
  return chainConstants[chainId];
};

export const supportedChains = [137];

/**
 * @param chainId
 * @returns {null|{tiers: number[], poolAddress: string, poolName: string, token: {symbol: string, address: string, decimals: string, name: string}}}
 */
export const getPools = (chainId) => {
  if (supportedChains.includes(chainId)) {
    return striptoPools[chainId];
  } else {
    return null;
  }
};
