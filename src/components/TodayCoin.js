import { useAxiosGet } from "../hooks/axiosGet";
import Crypto from "../components/Crypto";
import styled from "styled-components";
import CoinDetail from "./CoinDetail";

let currentPage = Math.floor(Math.random() * 457) + 1;
let cryptoPerPage = 20;
let cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoPerPage}&page=${currentPage}&sparkline=false`;
let randomCurrency = Math.floor(Math.random() * 20);

function TodayCoin({ openModal }) {
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
            <tr id="table-head">
            <th className="table-column-favorite"></th>
            <th className="table-column-logo" style={{textAlign: 'left', transform: 'translateX(22%)'}}>Name</th>
            <th className="table-column-symbol">Symbol</th>
            <th className="table-column-price" style={{padding: '10px'}}>Price (USD)</th>
            <th className="table-column-change" style={{padding: '10px'}}>Change (24h)</th>
            <th></th>
          </tr>
            </thead>
            <tbody>
              <Crypto
                key={crypto.id}
                crypto={cryptoList[randomCurrency]}
                openModal={openModal}
              />
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
