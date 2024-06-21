import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const {allCoin,curr}=useContext(CoinContext)
    const [displayCoin,setDisplayCoin]=useState([])
    const [input,setInput]=useState('')
    const [page,setPage]=useState(1)



    const inputHandler=(e)=>{
        setInput(e.target.value)
    }
    const searchHandler=async(e)=>{
        e.preventDefault()
        if(input.trim()===''){
            setDisplayCoin(allCoin)
            return
        }
       const res = await allCoin.filter((coin)=>{
        return  coin.name.toLowerCase().includes(input.toLowerCase())
        })
        
        setDisplayCoin(res)
    }
    const setPageHanler=(selected)=>{
        setPage(selected)
    }
    useEffect(()=>{
        setDisplayCoin(allCoin)
        // console.log(allCoin);
    },[allCoin])
  return (
    <div className='home'>
        <div className="hero">
            <h1>Largest <br /> Crypto Market Place</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace.</p>
                    <form onSubmit={searchHandler}>
                        <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Seach' required />
                        <datalist id='coinlist'>
                            {allCoin.map((coin,ind)=>(<option value={coin.name} key={ind}></option>))}
                        </datalist>
                        <button type='submit'>Search</button>
                    
                    </form>
        </div>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign: 'center'}}>24Hr Change</p>
                <p className='market'>Market Cap</p>


            </div>
            {
                displayCoin.length==0 && 
                <div className='no-coin'>No Coin Found!</div>
            }
            {displayCoin.length>0 && 
                displayCoin.slice(page*10-10,page*10).map((coin,ind)=>{
                   return ( <Link to={`/coin/${coin.id}`} key={ind} className="table-layout">
                        <p>{coin.market_cap_rank}</p>
                        <div>
                            <img src={coin.image} alt="" />
                            <p>{coin.name + " - "+coin.symbol}</p>

                        </div>
                            <p>{curr.symbol} {coin.current_price.toLocaleString()}</p>
                            <p className={coin.price_change_percentage_24h>=0?"green":"red"}>{Math.floor(coin.price_change_percentage_24h*100)/100}</p>
                            <p className='market'>{curr.symbol} {coin.market_cap.toLocaleString()}</p>
                        
                    </Link>)
                })
            }
            {displayCoin.length>0 && 
            <div className="pagination">
                <span className={page===1?"disabled":""} onClick={()=>setPageHanler(page-1)}> ← </span>
                <span>{page} / {displayCoin.length/10}</span>
                <span className={page===Math.ceil(displayCoin.length/10)?"disabled":""} onClick={()=>setPageHanler(page+1)}> → </span>


            </div>
            }
        </div>
    </div>
  )
}

export default Home