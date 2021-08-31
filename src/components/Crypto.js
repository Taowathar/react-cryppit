import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Crypto = (crypto) => {
  const [favorite, setfavorite] = useState(false);

  const changeFavorite = () => {
    setfavorite(!favorite);
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
          <img className="crypto-img" src={crypto.crypto.image} alt="logo" />
          {crypto.crypto.name}
        </div>
      </td>
      <td className="crypto-symbol">{crypto.crypto.symbol}</td>
      <td>{crypto.crypto.current_price}</td>
      <td>{crypto.crypto.price_change_percentage_24h}</td>
    </tr>
  );
};

export default Crypto;
