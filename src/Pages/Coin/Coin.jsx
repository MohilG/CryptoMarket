import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext'
import LineChart from '../../Components/LineChart/LineChart'
const Coin = () => {
  const {coinId}=useParams()
  const [coinData,setCoinData]=useState()
  const [chartData,setChartData]=useState()

  const {curr}=useContext(CoinContext)
  
  const fetchCoin=async()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-tnK91ZddNCYbUMhdeA2MDKY7	'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }
  const fetchChart=async()=>{
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': 'CG-tnK91ZddNCYbUMhdeA2MDKY7	'
  }
};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${curr.name}&days=10&interval=daily`, options)
  .then(response => response.json())
  .then(response => setChartData(response))
  .catch(err => console.error(err));
  }
  useEffect(()=>{
    fetchCoin()
    fetchChart()
  },[curr])
  if(coinData && chartData){

    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} {coinData.symbol.toUpperCase()}</b></p>
        </div>
        <div className="coin-chart">
          <LineChart chartData={chartData}/>
        </div>
        <div className="info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{curr.symbol} {coinData.market_data.current_price[curr.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{curr.symbol} {coinData.market_data.market_cap[curr.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>High 24H</li>
            <li>{curr.symbol} {coinData.market_data.high_24h[curr.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Low 24H</li>
            <li>{curr.symbol} {coinData.market_data.low_24h[curr.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className='spin'>
        <div id="loading"></div>
      </div>
    )
  }
}

export default Coin