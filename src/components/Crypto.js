import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from 'styled-components';

const InvestButton = styled.button`
    padding: 8px;
    background-color: #0bba0b;
    color: white;
    border: 0;
    border-radius: .5rem;
    cursor: pointer;
`


const Crypto = ({crypto, openModal}) => {
  const [favorite, setfavorite] = useState(false);

  const changeFavorite = () => {
    setfavorite(!favorite);
  };

  function onClick() {
    openModal(crypto);
  }

  const change = crypto.price_change_percentage_24h;

  return (
    <tr>
      <td style={{padding: '10px'}}>
        <div className="favoriteButton" onClick={changeFavorite}>
          {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </td>
      <td > 
        <div className="table-data-name">
          <img className="crypto-img" src={crypto.image} alt="logo" />
          <span style={{transform: 'translateY(10%)'}}>{crypto.name}</span>
        </div>
      </td>
      <td className="crypto-symbol">{crypto.symbol}</td>
      <td style={{textAlign: 'right', padding: '10px'}}>${crypto.current_price.toFixed(2)}</td>
      
      <td style={change < 0 ? {color: 'red', textAlign: 'right', padding: '10px'} : {color: 'green', textAlign: 'right', padding: '10px' }}>{change < 0 ? change.toFixed(2): `+${change.toFixed(2)}`}%</td>
      <td><InvestButton onClick={onClick}>Invest</InvestButton></td>
    </tr>
  );
};

export default Crypto;
