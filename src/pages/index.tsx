import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Crypto } from '@/components/Crypto'
import FausetLink from '@/components/FausetLink'
//@ts-ignore
import {ethers} from "ethers"
import USDT from '../USDT.json'
import { useEffect, useState } from 'react'
const POLYGON_USDT_ACCOUNT = "0x42c280e379e21d7f91e0ed4f5e8089425d316e49"

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [polygonUSDTBalance,setPolygonUSDTBalance] = useState(0);
  const [BinanceUSDTBalance,setBinanceUSDTBalance] = useState(0);

  useEffect(()=> {
    getBalance();
  },[])

  const getBalance = async() => {
    //@ts-ignore
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract_polygon = new ethers.Contract(POLYGON_USDT_ACCOUNT, USDT, provider);
    // const contract_binance = new ethers.Contract(POLYGON_USDT_ACCOUNT, USDT, provider);
    const currentAccount = await provider.listAccounts();
    const balance = await contract_polygon.balanceOf(currentAccount[0])
    const decimal = await contract_polygon.decimals();
    const balanceNumber = ethers.utils.formatUnits(balance,decimal);
    setPolygonUSDTBalance(Number(balanceNumber))
  }

  return (
    <div className="text-white min-h-screen">
    <header className="p-4 border-b border-purple-700">
      <h1 className="font-bold text-2xl">🔍 unchainFauset <span className="text-sm"></span></h1>
    </header>
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4"> unchain Fauset </h2>
      <div className="flex flex-row items-center">
        <Crypto logo='https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png' gradient='bg-gradient-to-r from-red-400 to-yellow-300 ' isPolygon={false}/>
        <Crypto logo="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png" gradient='bg-gradient-to-r from-blue-500 to-purple-600' isPolygon={true}/>
        <FausetLink img="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png" link='https://mumbaifaucet.com/'/>
        <FausetLink img="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png" link='https://testnet.bnbchain.org/faucet-smart'/>
      </div>
    </div>
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4"> Your Balance </h2>
      <div className="flex flex-row items-center">
        <p className='ml-20'>Polygon USDT: <span style={{color: "deeppink", fontWeight: "600"}}>{polygonUSDTBalance}</span></p>
        <h1 className='ml-20'>Binance USDT: {}</h1>
      </div>
      <h1 onClick={()=>getBalance()}>⚡️reload</h1>
    </div>
    <footer className="p-4 border-t border-purple-700 mt-4">
      <p>🍪 This website uses cookies to improve your experience. By continuing to use this website, you agree to its Terms and Privacy Policy.</p>
    </footer>
  </div>
     )
}
