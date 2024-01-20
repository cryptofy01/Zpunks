import abi from "./abi.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {string}
 * @param provider {import('ethers').Provider}
 * @returns {import('ethers').Contract}
 */
export const getMoonContract = ({ address, provider }) => {
  return getContract(address, provider, abi);
};

/* Non Level Dependent */

/**
 * @param address {string}
 * @param provider {import('ethers').Provider}
 * @returns {Promise<boolean>}
 */
export const isStakingEnabled = async ({ address, provider }) => {
  const contract = getMoonContract({ address, provider });
  return contract.isStakingEnabled();
};

/**
 * @param address {string}
 * @param provider {import('ethers').Provider}
 * @returns {Promise<import('ethers').BigNumber>}
 */
export const getMaxTxAmount = async ({ address, provider }) => {
  const contract = getMoonContract({ address, provider });
  return contract.maxTxAmount();
};

/**
 * @param address {string}
 * @param provider {import('ethers').Provider}
 * @returns {Promise<import('ethers').BigNumber>}
 */
export const getMinTxAmount = async ({ address, provider }) => {
  const contract = getMoonContract({ address, provider });
  return contract.minTxAmount();
};

/**
 * @param address {string}
 * @param provider {import('ethers').Provider}
 * @returns {Promise<import('ethers').BigNumber>}
 */
export const getPenalty = async ({ address, provider }) => {
  const contract = getMoonContract({ address, provider });
  return contract.penalty();
};

/*  Level Dependent  */

/**
 *
 * @param address   {string}    Contract Address
 * @param provider {import('ethers').Provider}  Provider
 * @param tier {1 | 2 | 3 }  Tier
 * @returns {Promise<{lockPeriod: import('ethers').BigNumber, apy: import('ethers').BigNumber}>}
 */
export const getTierDetails = async ({ address, provider, tier }) => {
  const contract = getMoonContract({ address, provider });
  const lockPeriod = await contract.tierListTimeLimit(tier);
  const apy = await contract.getTier(tier);
  return { lockPeriod, apy };
};

export const getAllTiersDetails = async ({ address, provider }) => {
  const tier1 = await getTierDetails({ address, provider, tier: 1 });
  const tier2 = await getTierDetails({ address, provider, tier: 2 });
  const tier3 = await getTierDetails({ address, provider, tier: 3 });
  return [tier1, tier2, tier3];
};

/**
 *
 * @param address   {string}    Contract Address
 * @param provider {import('ethers').Provider}  Provider
 * @param userAddress {string} User Address
 * @param tier {1 | 2 | 3 }  Tier
 * @returns {Promise<{level: import('ethers').BigNumber, amount: import('ethers').BigNumber,initialTime: import('ethers').BigNumber, endTime: import('ethers').BigNumber, rewardAmount: import('ethers').BigNumber,withdrawAmount: import('ethers').BigNumber,isActive: boolean,pendingRewards : import('ethers').BigNumber}>}
 */
export const getUserDetails = async ({
  address,
  provider,
  userAddress,
  tier,
}) => {
  const contract = getMoonContract({ address, provider });
  const res = await contract.getUserDetails(userAddress, tier);

  const [
    level,
    amount,
    initialTime,
    endTime,
    rewardAmount,
    withdrawAmount,
    isActive,
  ] = await res[0];
  const pendingRewards = await res[1];
  return {
    level,
    amount,
    initialTime,
    endTime,
    rewardAmount,
    withdrawAmount,
    isActive,
    pendingRewards,
  };
};

/**
 * @param address
 * @param provider
 * @param userAddress
 * @param tiers
 * @returns {Promise<Awaited<{level: import('ethers').BigNumber, amount: import('ethers').BigNumber,initialTime: import('ethers').BigNumber, endTime: import('ethers').BigNumber, rewardAmount: import('ethers').BigNumber,withdrawAmount: import('ethers').BigNumber,isActive: boolean,pendingRewards : import('ethers').BigNumber}>[]>}
 */
export const getAllLevelDetails = async ({
  address,
  provider,
  userAddress,
  tiers,
}) => {
  return await Promise.all(
    tiers.map((tier) =>
      getUserDetails({ address, provider, userAddress, tier })
    )
  );
};

/*   write functions */

export const stake = async ({ address, signer, amount, tier }) => {
  console.log("stake", signer);
  const contract = await getMoonContract({ address, provider: signer });
  return contract.stake(amount, tier);
};

export const withdraw = async ({ address, signer, tier }) => {
  const contract = getMoonContract({ address, provider: signer });
  return contract.withdraw(tier);
};

export const emergencyWithdraw = async ({ address, signer, tier }) => {
  const contract = getMoonContract({ address, provider: signer });
  return contract.emergencyWithdraw(tier);
};

export default {
  isStakingEnabled,
  getMaxTxAmount,
  getMinTxAmount,
  getPenalty,
  getTierDetails,
  getUserDetails,
  getAllLevelDetails,
  getAllTiersDetails,
  stake,
  withdraw,
  emergencyWithdraw,
};
