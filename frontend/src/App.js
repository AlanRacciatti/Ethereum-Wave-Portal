import React, { useEffect, useState, useRef } from "react";
import { ethers } from 'ethers';
import './App.css';
import { ContractAddress } from './utils/ContractAddress.json';
import { abi } from './utils/WavePortal.json';
import  swal  from 'sweetalert'

// **** Functions ****
import {switchToRinkebyNetwork} from './functions/switchToRinkebyNetwork';

// **** Components ****
import Header from './components/Header';
import WaveBtn from './components/WaveBtn';
import WaveCounter from './components/WaveCounter';
import WaitingContainer from './components/WaitingContainer';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import AllWavesContainer from './components/AllWavesContainer';
import FooterContainer from './components/FooterContainer';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [waveCount, setWaveCount] = useState(0);
  const [allWaves, setAllWaves] = useState([]);
  const awaitTransactionContainer = useRef(null);
  
  const contractAddress = ContractAddress;
  const contractABI = abi;

  const updateWaveCount = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        count = ethers.BigNumber.from(count).toNumber();
        setWaveCount(count);
      }
    } catch (error) {
      console.error(error); 
    }
  }

  const checkIfWalletIsConnect = async () => {
    try {
      const { ethereum } = window;
  
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0])
      }

    } catch (error) {
      console.error(error);
    };
  }

  const updateAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];

        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask");
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    };
  }

  const wave = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        if (await wavePortalContract.canWave(signer.getAddress())) {
          const message = await swal({
            text: 'Put your message here...',
            content: "input",
            button: {
              text: "Wave!",
            },
          })
          const waveTxn = await wavePortalContract.wave(message);
  
          awaitTransactionContainer.current.className = awaitTransactionContainer.current.className.replace("d-none", "");
  
          await waveTxn.wait();
  
          awaitTransactionContainer.current.className += " d-none";
        } else {
          swal ("Oops" , "You have to wait 15 minutes until sending another wave",  "error" )
        }
        
      }
    } catch (error) {
      console.error(error); 
    }
}

  const setupEventListener = () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          updateWaveCount();
          setAllWaves(prevState => [
            ...prevState,
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message: message
            }
          ])
        });
        }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnect();
    updateAllWaves();
    updateWaveCount();
    setupEventListener();
  }, [])

  return (
    <div className="mainContainer" onLoad={() => switchToRinkebyNetwork()}>
      <div className="dataContainer">
        <Header />
        <WaveBtn wave={wave} />
        <WaveCounter waveCount={waveCount} />
        <WaitingContainer containerRef={awaitTransactionContainer}/>
        {!currentAccount && <ConnectWalletContainer currentAccount={currentAccount} connectWallet={connectWallet} />}
        <AllWavesContainer allWaves={allWaves} />      
      </div>
      <FooterContainer /> 
    </div>
  );
}
