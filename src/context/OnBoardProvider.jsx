import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import PropTypes from "prop-types";
import { getChain } from "../web3Utils/ChainUtils/chainList";
import { readSelectedChainId } from "../configs/chainIdConfigs";

const chain = getChain(readSelectedChainId());
// console.log("chain", readSelectedChainId());
const chains = [
  {
    id: "0x" + chain.id.toString(16),
    token: chain?.currency?.name,
    label: chain?.name,
    rpcUrl: chain?.rpcUrl,
  },
];
const walletConnect = walletConnectModule({
  projectId: "55f062a384703e1ecf69dc1e2dd91bfb",
  /*
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
 
  connectFirstChainId: true,
   */
  version: 2,
});
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

const wallets = [injectedModule(), walletConnect, coinbaseWalletSdk];

const onBoard = init({
  wallets,
  chains,
  connect: {
    showSidebar: false,
  },
  accountCenter: {
    desktop: {
      enabled: false,
      //position?: AccountCenterPosition
      //expanded?: boolean
      //minimal: true,
    },
    mobile: {
      enabled: false,
    },
  },
});
/**
 *
 * @param children{React.ReactNode}
 * @param chain{{name: string, explorer: string, currency: {symbol: string, decimals: number, name: string}, id: number, rpcUrl: string}} - The chain id of the network you want to connect to
 * @returns {JSX.Element}
 * @constructor
 */
const OnBoardProvider = ({ children }) => {
  return (
    <Web3OnboardProvider web3Onboard={onBoard}>{children}</Web3OnboardProvider>
  );
};

OnBoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnBoardProvider;
