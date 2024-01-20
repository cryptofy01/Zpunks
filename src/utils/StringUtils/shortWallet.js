const getShortenedWallet = (wallet) => {
  const start = wallet.substring(0, 3);
  const end = wallet.substring(wallet.length - 3);
  return `${start}...${end}`;
};

export default getShortenedWallet;
