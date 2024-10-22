import React, { PropsWithChildren, useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";

// Create a new Algorand client
const algod = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [peraWallet] = useState(() => new PeraWalletConnect());
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  useEffect(() => {
    // Reconnect to Pera Wallet on page load
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));

    // Handle disconnect event
    peraWallet.connector?.on("disconnect", () => {
      setAccountAddress(null);
    });

    return () => {
      // Cleanup: remove event listeners
      peraWallet.disconnect();
    };
  }, [peraWallet]);

  const connectToPeraWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      setAccountAddress(newAccounts[0]);
    } catch (error) {
      console.error("Error connecting to Pera Wallet:", error);
    }
  };

  const disconnectPeraWallet = async () => {
    await peraWallet.disconnect();
    setAccountAddress(null);
  };

  return (
    <AlgorandWalletContext.Provider
      value={{
        peraWallet,
        accountAddress,
        connectToPeraWallet,
        disconnectPeraWallet,
        algod,
      }}
    >
      {children}
    </AlgorandWalletContext.Provider>
  );
};

// Create and export the context
export const AlgorandWalletContext = React.createContext<{
  peraWallet: PeraWalletConnect;
  accountAddress: string | null;
  connectToPeraWallet: () => Promise<void>;
  disconnectPeraWallet: () => Promise<void>;
  algod: algosdk.Algodv2;
} | null>(null);

export const useAlgorandWallet = () => {
  const context = React.useContext(AlgorandWalletContext);
  if (!context) {
    throw new Error("useAlgorandWallet must be used within a WalletProvider");
  }
  return context;
};