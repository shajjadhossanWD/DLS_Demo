import { ethers, Contract, BigNumber } from "ethers";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import swal from "sweetalert";
import Web3 from 'web3';


export const CelebrityContext = createContext();

const { ethereum } = window;

export default function CelebrityProvider({ children }) {





  return (
    <CelebrityContext.Provider
      value={{
      
      }}
    >
      {children}
    </CelebrityContext.Provider>
  );
}