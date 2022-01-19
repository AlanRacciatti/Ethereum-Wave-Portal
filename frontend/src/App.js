import React, { useEffect, useState, useRef } from "react";
import { ethers } from 'ethers';
import './App.css';
import abi from './utils/WavePortal.json'
import { Spinner } from 'react-bootstrap';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [waveCount, setWaveCount] = useState(0);
  const [allWaves, setAllWaves] = useState([]);
  const [error, setError] = useState();
  const awaitTransaction = useRef(null);

  const changeNetworkRinkeby = async (setError) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");

      setTimeout(async () => {
        let chainId = window.ethereum.chainId;
        
        if (chainId !== "0x4") {
          console.log(chainId)
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: '0x4'
              }
            ]
          }); 
  
          window.location.reload();

        };
        
      }, 500);
      

    } catch (error) {
      setError(error.mesage)
    };
  };

  const contractAddress = "0x97585945E9d2d0d19Ff0BC39A42024590EaAbd36";

  const contractABI = abi.abi;

  const getWaveCount = async () => {
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
  
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return
      } else {
        console.log("We have the ethereum object: ", ethereum);
      };

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0])
      }

    } catch (error) {
      console.error(error);
    };
  }

  const getAllWaves = async () => {
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

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    };
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const message = prompt("Your message")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log(count)

        const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
        console.log("Mining...", waveTxn.hash);

        awaitTransaction.current.className = awaitTransaction.current.className.replace("d-none", "");

        await waveTxn.wait();

        awaitTransaction.current.className += " d-none";

        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      }
    } catch (error) {
      console.error(error); 
    }
  }

  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      getWaveCount()
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message
        }
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract= new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on("NewWave", onNewWave);

      return () => {
        if (wavePortalContract) {
          wavePortalContract.off("NewWave", onNewWave);
        }
      };
    };
  }, []);
  

  useEffect(() => {
    checkIfWalletIsConnect();
    getAllWaves();
    getWaveCount();
  }, [])

  return (
    <div className="mainContainer" onLoad={() => changeNetworkRinkeby(setError)}>
      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="wave">👋</span> Benvenuti!
        </div>

        <div className="bio">
        I am Chiin and I like milanesas
        </div>

        <button className="waveButton margin-wave-btn" onClick={wave}>
          Wave at Me
        </button>

        <div className="container-wave">
        <button className="waveButton waves-number-btn w-100 pe-none">
          Number of waves: {waveCount}
        </button>
        </div>

        <div className="waitingGif d-none" ref={awaitTransaction}>
          <p>Writing your message in the blockchain. Please wait</p>
          
          <div>
          <img src="https://c.tenor.com/AspjzmOgmVMAAAAM/pickaxe-rock.gif" alt="waiting gif"/>
          </div>

          <div className="mt-10">
            <Spinner animation="border" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>

        </div>

        {!currentAccount && (
        <button className="waveButton loginButton" onClick={connectWallet}>
          Connect Wallet
        </button>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
