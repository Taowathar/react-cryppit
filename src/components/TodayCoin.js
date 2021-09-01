import { useAxiosGet } from "../hooks/axiosGet";
import Crypto from "../components/Crypto";
import styled from "styled-components";
import CoinDetail from "./CoinDetail";

let currentPage = Math.floor(Math.random() * 457) + 1;
let cryptoPerPage = 20;
let cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoPerPage}&page=${currentPage}&sparkline=false`;
let randomCurrency = Math.floor(Math.random() * 20);

function TodayCoin() {
  let cryptoList = null;
  let hasCurr = false;

  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, [currentPage]);

  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  if (cryptoList != null) {
    hasCurr = true;
  }

  return (
    <div>
      <Title>Today's coin</Title>
      {hasCurr && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Favorite</th>
                <th>Name</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <Crypto key={crypto.id} crypto={cryptoList[randomCurrency]} />
            </tbody>
          </table>
          <CoinDetail currency={cryptoList[randomCurrency].id}></CoinDetail>
        </div>
      )}
    </div>
  );
}

const Title = styled.h1`
  text-align: center;
`;

export default TodayCoin;
