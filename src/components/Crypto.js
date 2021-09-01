import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Crypto = ({ crypto, isFavorite }) => {
  const [favorite, setfavorite] = useState(isFavorite);

  const changeFavorite = () => {
    setfavorite(!favorite);
    if (favorite) {
      localStorage.removeItem(`favorite ${crypto.id}`);
    } else {
      localStorage.setItem(`favorite ${crypto.id}`, JSON.stringify(crypto));
    }
  };

  return (
    <tr>
      <td>
        <div className="favoriteButton" onClick={changeFavorite}>
          {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </td>
      <td>
        <div className="table-data-name">
          <img className="crypto-img" src={crypto.image} alt="logo" />
          {crypto.name}
        </div>
      </td>
      <td className="crypto-symbol">{crypto.symbol}</td>
      <td>{crypto.current_price}</td>
      <td>{crypto.price_change_percentage_24h}</td>
    </tr>
  );
};

export default Crypto;
