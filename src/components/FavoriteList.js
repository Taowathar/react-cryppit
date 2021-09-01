import React, { useEffect, useState } from "react";
import Crypto from "./Crypto";

const FavoriteList = () => {
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

        </tbody>
      </table>
    </div>
  );
};

export default FavoriteList;
