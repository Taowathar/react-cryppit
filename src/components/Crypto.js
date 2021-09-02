import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InvestButton } from "./InvestButton";

const Crypto = ({ crypto, openModal, isFavorite }) => {
  const [favorite, setfavorite] = useState(isFavorite);

  useEffect(() => {
    const getAllItemFromLocalStorage = () => {
      let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

      while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])).id);
      }

      return values;
    };

    let storage = getAllItemFromLocalStorage();
    if (storage.includes(crypto.id)) {
      setfavorite(true);
    }
  }, []);

  const changeFavorite = () => {
    setfavorite(!favorite);
    if (favorite) {
      localStorage.removeItem(`favorite ${crypto.id}`);
    } else {
      localStorage.setItem(`favorite ${crypto.id}`, JSON.stringify(crypto));
    }
  };

  function onClick() {
    openModal(crypto);
  }

  const change = crypto.price_change_percentage_24h;

  return (
    <tr>
      <td style={{ padding: "10px" }}>
        <div className="favoriteButton" onClick={changeFavorite}>
          {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </td>
      <td>
        <Link className="detail-link" to={`/details/${crypto.id}`}>
        <div className="table-data-name">
          <img className="crypto-img" src={crypto.image} alt="logo" />
          <span style={{ transform: "translateY(10%)" }}>{crypto.name}</span>
        </div>
        </Link>
      </td>
      <td className="crypto-symbol">{crypto.symbol}</td>
      <td style={{ textAlign: "right", padding: "10px" }}>
        ${crypto.current_price.toFixed(2)}
      </td>

      <td
        style={
          change < 0
            ? { color: "red", textAlign: "right", padding: "10px" }
            : { color: "green", textAlign: "right", padding: "10px" }
        }
      >
        {change < 0 ? change.toFixed(2) : `+${change.toFixed(2)}`}%
      </td>
      <td className="investButton">
        <InvestButton onClick={onClick}>Invest</InvestButton>
      </td>
    </tr>
  );
};

export default Crypto;
