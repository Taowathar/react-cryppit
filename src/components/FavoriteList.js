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
        storage.push(JSON.parse(localStorage.getItem(keys[i])));
      }

      return storage;
    };

    setFavorites(getAllItemFromLocalStorage());
  }, [storage]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Favorite</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
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
