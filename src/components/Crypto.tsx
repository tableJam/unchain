import React, { useEffect,useState } from 'react'
const POLYGON_USDT_ACCOUNT = "0x42c280e379e21d7f91e0ed4f5e8089425d316e49"
import {ethers} from "ethers";
import USDT from "../USDT.json"

  const switchPolygon = async (ethereum:any) => {
    const chainId16 = "0x13881";
    try{
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId16 }]
      });
    }catch(e) {
      await ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13881', // 137 in hexadecimal, Polygon Testnet (Mumbai)
            chainName: 'Mumbai',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
          },
        ],
      });
    }
  }

  const switchBinance = async (ethereum:any) => {
    const chainId = "0x61";
    try{
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });
    }catch(e) {
      await ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId, // 97 in hexadecimal, BSC Testnet
            chainName: 'Binance Smart Chain Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
          },
        ],
      })
    }
  }

  const addCryptoToWallet = async (ethereum:any) => {
    ethereum.request({  
    method: 'wallet_watchAsset',  
    params: {  
      type: 'ERC20',  
      options: {  
        address: POLYGON_USDT_ACCOUNT,  
        symbol: 'USDT',  
        decimals: 6,  
        image: 'https://images.wantedly.com/i/NiigVGy',  
      },  
    },  
  })  
}
  
    


export const Crypto = (prop:{logo: string,gradient: string,isPolygon: boolean }) => {
  const [amount,setAmount] = useState(0);
  const {logo,gradient,isPolygon} = prop;

  const getCrypto = async(isPolygon?: boolean) => {
    try{
      //@ts-ignore
      const {ethereum} = window;
    
      await ethereum?.request({
        method: 'eth_requestAccounts'
      });
      if(isPolygon) await switchPolygon(ethereum);
      if(!isPolygon) await switchBinance(ethereum);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(POLYGON_USDT_ACCOUNT, USDT, signer);
      const decimal = await contract.decimals();
      const getAmount = ethers.utils.parseUnits(amount.toString(), decimal);
      let tx = await contract.fauset(getAmount,'unchain');
      console.log(tx.hash);
      tx = tx.wait()
      addCryptoToWallet(ethereum);
    }catch{
      console.error('>??????')
    }
    return;
  }

  return (
    <div className="w-70 ml-10 h-55 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md">
      <div className={`w-70 h-55 ${gradient} rounded-lg shadow-md p-4 flex flex-col justify-between`}>
      {/* ロゴの部分 */}
      <div className="w-20 h-8 rounded p-1">
        <img src={logo} width={"40px"} height={"40px"}></img>
        <p className='text-sm'>USDT</p>
      </div>
      {/* 数字の入力要素 */}
      <div className='flex'>
      <input
        onChange={(e)=>setAmount(Number(e.target.value))}
        type="number"
        placeholder="input how much you want 💰💵"
        className="bg-white mt-10 bg-opacity-10 rounded p-2 text-white text-center"
      />
      <div onClick={()=>getCrypto(isPolygon)}>💰💵🍪🍪click</div>
      </div>
    </div>
    </div>
  )
}
