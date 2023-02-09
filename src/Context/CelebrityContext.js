import { ethers, Contract, BigNumber } from "ethers";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import swal from "sweetalert";
import Web3 from 'web3';
export const CelebrityContext = createContext();
const { ethereum } = window;

export default function CelebrityProvider({ children }) {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [user, setUser] = useState({});
  const [chain, setChain] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [userRefetch, setUserRefetch] = useState(false);

  let walletAddress;

  const connectToMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
       console.log("â€œerrorâ€")
    }
    let provider = null;
    if (typeof window.ethereum !== "undefined") {
      let provider = window.ethereum;
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p) => {
          if (p.isMetaMask) provider = p;
        });
      }
      try {
        const chainid = await provider.request({
          method: "eth_chainId",
        });
        setChain(chainid);
        if (chainid === "0x38") {
          await ethereum.request({ method: "eth_requestAccounts" });
          ethereum.on("accountsChanged", function (accounts) {
          setWalletAddress(accounts[0]);
        });
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
        await axios
            .post(`https://backend.celebritygames.net/api/v1/user/`, {
              walletAddress: walletAddress,
            }, {
              headers: { "authorization": `Bearer bIq7Olx4abs2zDM01DMMEgt33fbEe54fuTBncWdXFhWYOs3CrKZt86atzL3-CJdExpP4` }
            })
          .then((res) => {
            if (res.data.user) {
              setUser(res.data.user);
              localStorage.setItem("tokenCelebrity", res.data.token);
              setLoading(false);
            }
          })
        
          .finally(() => {
          })
         
        } else {
          console.log("Please Switch to Binance Chain");
        }
      } catch (error) {
        throw new Error("User Rejected");
      }
    } else {
      throw new Error("No MetaMask Wallet found");
    }
    console.log("MetaMask provider", provider);
    return provider;
  };

  const setWalletAddress = async(newAddress)=> {
    walletAddress = newAddress;
    setCurrentAccount(walletAddress);
    document.getElementById("walletAddress").innerHTML = walletAddress;    
  };

  const logOut = async () => {
    setCurrentAccount(null);
    setUser({});
    localStorage.removeItem("tokenCelebrity");
  };
   
  const walletDetecter = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    }
  }
  
  useEffect(() => {
    if (currentAccount && localStorage.getItem("tokenCelebrity")) {
      setLoading(true);
      axios
        .get(`https://backend.celebritygames.net/api/v1/user/`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("tokenCelebrity")}`,
          },
        }, {
          headers: { "authorization": `Bearer bIq7Olx4abs2zDM01DMMEgt33fbEe54fuTBncWdXFhWYOs3CrKZt86atzL3-CJdExpP4` }
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
      setUserRefetch(false);
    }
    console.log(user, 'users')

    walletDetecter();
  }, [currentAccount, userRefetch, localStorage.getItem("tokenCelebrity")]);

 return (
    <CelebrityContext.Provider
      value={{
        connectToMetamask
      }}
    >
      {children}
    </CelebrityContext.Provider>
 );
}