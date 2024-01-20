import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import UseQueryWrapper from "./UseQueryWrapper";
import { providers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import { saveSelectedChainId } from "../configs/chainIdConfigs";
import { supportedChains } from "../configs/configs";
import { getChain } from "../web3Utils/ChainUtils/chainList";

/**
 * @param label
 */
const writeCacheWallet = (label) => {
  window.localStorage.setItem("cachedWallet", label);
};

/**
 * @returns {string}
 */
const readCacheWallet = () => {
  return window.localStorage.getItem("cachedWallet");
};

export const WalletContext = createContext({
  isCorrectNetwork: false,
  address: null,
  chain: null,
  /**
   * @type {import("ethers").Provider | undefined}
   */
  provider: null,
  connectedProvider: null,
  /**
   * @type {import("ethers").Signer}
   */
  signer: null,
  isConnected: false,
  isLoading: true,
  openConnectModal: () => {},
  requestSwitchNetwork: () => {},
  requestDisconnect: () => {},
  changeNetwork: () => {},
});

/**
 *
 * @param children{JSX.Element}
 * @param chainId{{  id: number, name: string,rpcUrl: string,explorer: string,currency: {name: string,symbol: string, decimals: string}}} - The chain id of the network you want to connect to
 * @returns {JSX.Element}
 * @constructor
 */
export const WalletContextProvider = ({ children, chain }) => {
  console.log("chain", chain);
  if (!chain?.id)
    throw new Error("You must provide a chain to the WalletContextProvider");

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [provider, setProvider] = useState(
    new providers.StaticJsonRpcProvider(chain.rpcUrl)
  );
  const [connectedProvider, setConnectedProvider] = useState(null);

  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [address, setAddress] = useState(null);

  const changeNetwork = async (id) => {
    if (supportedChains.includes(id)) {
      requestSwitchNetwork(getChain(id))
        .then(() => {
          saveSelectedChainId(id);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const init = () => {
    setIsLoading(true);
    if (wallet?.provider) {
      writeCacheWallet(wallet.label);
      const provider = new providers.Web3Provider(wallet.provider);
      provider.getNetwork().then((network) => {
        const chainID = network.chainId;

        //provider._network = { ...network, chainId: chainID };
        setConnectedProvider(provider);
        if (chainID === chain.id) {
          //const signer = provider.getSigner();
          setSigner(provider.getSigner());
          setIsCorrectNetwork(true);
          setProvider(provider);
        } else {
          const valid = supportedChains.includes(Number(chainID));
          if (valid) {
            saveSelectedChainId(chainID);
          } else {
            setSigner(null);
            const provider = new providers.StaticJsonRpcProvider(chain.rpcUrl);
            provider._network = { name: chain.name, chainId: chain.id };
            setProvider(provider);
            setIsCorrectNetwork(false);
          }
        }

        setIsConnected(true);
        setAddress(wallet.accounts[0].address);
      });
    } else if (readCacheWallet()) {
      connect({
        autoSelect: {
          label: readCacheWallet(),
          disableModals: true,
        },
      }).catch((e) => {
        console.log(e);
      });
    } else {
      // nothing connected lets set a simple provider here
      setSigner(null);
      setIsConnected(false);
      setAddress(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, [wallet, wallet?.provider]);

  const requestSwitchNetwork = async (chainArg = chain) => {
    //if (isCorrectNetwork) return;
    try {
      await connectedProvider.send("wallet_switchEthereumChain", [
        { chainId: `0x${chainArg.id.toString(16)}` },
      ]);
    } catch (e) {
      console.log(e);
      if (e.code === 4902) {
        try {
          await connectedProvider.send("wallet_addEthereumChain", [
            {
              chainId: `0x${chainArg.id.toString(16)}`,
              chainName: chainArg.name,
              nativeCurrency: chainArg.currency,
              rpcUrls: [chainArg.rpcUrl],
              blockExplorerUrls: [chainArg.explorer],
            },
          ]);
        } catch (e) {
          console.log("error while switching" + e);
        }
      } else {
        // handle other "switch" errors
      }
    } finally {
      if (chainArg.id !== chain.id) {
        saveSelectedChainId(chainArg.id);
      }
    }
  };

  const handleDisconnect = async () => {
    if (!wallet?.provider) return;
    const tconfirm = window.confirm(
      "Are you sure you want to disconnect your wallet? this will reload the page and delete any data related to this wallet"
    );
    if (!tconfirm) return;
    writeCacheWallet(null);

    disconnect({ label: wallet.label })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        writeCacheWallet(null);
        window.location.reload();
      });
  };

  const requestDisconnect = async () => {
    return handleDisconnect();
  };

  const openConnectModal = () => {
    connect();
  };

  return (
    <WalletContext.Provider
      value={{
        isCorrectNetwork: isCorrectNetwork,
        address: address,
        provider,
        connectedProvider,
        signer,
        isConnected: isConnected,
        isLoading: isLoading || connecting,
        openConnectModal,
        requestSwitchNetwork,
        requestDisconnect,
        changeNetwork,
        chain,
      }}
    >
      <UseQueryWrapper>{children}</UseQueryWrapper>
    </WalletContext.Provider>
  );
};

WalletContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  chain: PropTypes.object.isRequired,
};

export default WalletContextProvider;
