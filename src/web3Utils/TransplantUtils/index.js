import abi from "../abis/transplant-abi.json";

// eslint-disable-next-line no-unused-vars
import { BigNumber, ethers } from "ethers";

export const getTransplantContract = (address, provider) => {
  return new ethers.Contract(address, abi, provider);
};

/**
 * @param address
 * @param provider
 * @returns {Promise<{totalStaked: BigNumber, token: string, totalRewards: BigNumber,totalVotingPower: BigNumber, decimals:BigNumber, pools: Array<{totalStaked: BigNumber, minDeposit: BigNumber, lockPeriod: BigNumber, votingWeight: BigNumber, apy: BigNumber, totalEstimatedRewards: BigNumber}>}>}
 */
export const farmDetails = async ({ address, provider }) => {
  const contract = getTransplantContract(address, provider);
  /*
    address token;
    uint96 decimals;
    uint256 totalStaked;
    uint256 totalRewards;
    uint256 totalVotingPower;
    ExtendedPoolInfo[3] pools;
     */
  const details = await contract.getFarmDetails();

  return {
    token: details.token,
    decimals: details.decimals,
    totalStaked: details.totalStaked,
    totalRewards: details.totalRewards,
    totalVotingPower: details.totalVotingPower,
    pools: details.pools,
  };
};

/**
 * @param address string contract address
 * @param provider {ethers.Provider || ethers.providers.JsonRpcProvider}
 * @param user {address: string, amount: BigNumber}
 * @returns {Promise<{votingPower: BigNumber, estimatedRewards: [BigNumber,BigNumber,BigNumber], totalStaked: BigNumber, deposits: Array<{amount: BigNumber, depositTime: BigNumber}>, totalRewards: BigNumber}>}
 */
export const getUserInfo = async ({ address, provider, user }) => {
  const contract = getTransplantContract(address, provider);
  /**
   * @type {{
   *         totalStaked: BigNumber,
   *         historicalRewards: BigNumber,
   *     totalRewards: BigNumber,
   *     votingPower: BigNumber,
   *     deposits : Array<{
   *         amount: BigNumber,
   *         depositTime: BigNumber,
   *     }>,
   *     estimatedRewards: [BigNumber, BigNumber, BigNumber],
   * }}
   */
  const userInfo = await contract.getUserInfo(user);

  return {
    ...userInfo,
  };
};

/**
 * @param address
 * @param provider
 * @returns {Promise<boolean>}
 */
export const isPaused = async ({ address, provider }) => {
  const contract = getTransplantContract(address, provider);
  return await contract.paused();
};

/**
 * @param address {string} contract address
 * @param signer {ethers.Signer || ethers.providers.JsonRpcSigner}
 * @param tier {number} 0,1,2
 * @param amount {BigNumber || string}
 */
export const deposit = ({ address, signer, tier, amount }) => {
  const contract = getTransplantContract(address, signer);

  return contract.deposit(tier, amount);
};

export const withdraw = ({ address, signer, tier }) => {
  const contract = getTransplantContract(address, signer);

  return contract.withdraw(tier);
};
