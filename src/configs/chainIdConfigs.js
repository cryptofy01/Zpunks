/**
 *
 * @returns {number}
 */
export const readSelectedChainId = () => {
  const selectedChainId = window.localStorage.getItem("selectedChainId");
  return selectedChainId
    ? Number(selectedChainId)
    : Number(process.env.DEFAULT_CHAIN_ID);
};

/**
 * @param chainId
 */
export const saveSelectedChainId = (chainId) => {
  if (Number(chainId) === readSelectedChainId()) return;

  window.localStorage.setItem("selectedChainId", chainId);
  window.location.reload();
};
