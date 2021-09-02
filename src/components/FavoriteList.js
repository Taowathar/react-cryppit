import React, { useEffect, useState } from "react";
import Crypto from "./Crypto";

const FavoriteList = () => {
  let [favorites, setFavorites] = useState([]);
  let storage = [];

  useEffect(() => {
    const getAllItemFromLocalStorage = () => {
      let keys = Object.keys(localStorage),
        i = keys.length;

      while (i--) {
        if (keys[i].includes("favorite")) {
          storage.push(JSON.parse(localStorage.getItem(keys[i])));
        }
      }

      return storage;
    };

    setFavorites(getAllItemFromLocalStorage());
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr id="table-head">
            <th className="table-column-favorite"></th>
            <th
              className="table-column-logo"
              style={{ textAlign: "left", transform: "translateX(22%)" }}
            >
              Name
            </th>
            <th className="table-column-symbol">Symbol</th>
            <th className="table-column-price" style={{ padding: "10px" }}>
              Price (USD)
            </th>
            <th className="table-column-change" style={{ padding: "10px" }}>
              Change (24h)
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favorites &&
            favorites.map((crypto) => (
              <Crypto key={crypto.id} crypto={crypto} isFavorite={true} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteList;
