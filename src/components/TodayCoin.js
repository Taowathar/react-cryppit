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
  let randomCurr = null;

  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, [currentPage]);

  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  if (cryptoList != null) {
    hasCurr = true;
    randomCurr = cryptoList[randomCurrency];
  }

  return (
    <TodayDiv>
      <Title>Today's coin</Title>
      {hasCurr && (
        <div className="todayCoin">
          <CoinDetail crypto={randomCurr} openModal={openModal}></CoinDetail>
        </div>
      )}
    </TodayDiv>
  );
}

const Title = styled.h1`
  text-align: center;
`;

const TodayDiv = styled.div`
  border: 4px solid #a29d9d;
  margin: 3rem;
  max-width: 75rem;
  margin-left: 17rem;
  background-color: #f2eee3;
`;

export default TodayCoin;
