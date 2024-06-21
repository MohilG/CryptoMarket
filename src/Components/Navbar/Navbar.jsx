import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow from '../../assets/arrow_icon.png';
import { CoinContext } from '../../Context/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setCurr } = useContext(CoinContext);

  const setCurency = (e) => {
    switch(e.target.value){
      case "usd":
        setCurr({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurr({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurr({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurr({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
      <img className='logo' src={logo} alt="Logo" />
      </Link>
      <ul>
        <Link to={'/'}>
        <li>Home</li>
        </Link>
        
      </ul>
      <div className="nav-right">
        <select onChange={setCurency}>
          <option value="usd">USD</option>
          <option value="eur">Euro</option>
          <option value="inr">INR</option>
        </select>
        <Link to={'https://www.coingecko.com/'}><button>CoinGecko <img src={arrow} alt="Arrow Icon" /></button></Link>
      </div>
    </div>
  );
}

export default Navbar;
