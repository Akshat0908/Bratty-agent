import { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const GAIA_API_URL = process.env.REACT_APP_GAIA_API_URL;

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [gaiaModel, setGaiaModel] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const getGaiaModels = async () => {
    try {
      const response = await axios.post(`${GAIA_API_URL}/models`);
      const models = response.data.data;
      setGaiaModel(models[0].id);
    } catch (error) {
      console.error("Failed to fetch Gaia models:", error);
    }
  };

  const getGaiaResponse = async (messages) => {
    try {
      const response = await axios.post(`${GAIA_API_URL}/chat/completions`, {
        messages,
        model: gaiaModel,
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Failed to get Gaia response:", error);
      return "Error: Unable to get response from Gaia";
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
    getGaiaModels();
  }, []);

  return { account, connectWallet, web3, getGaiaResponse };
};