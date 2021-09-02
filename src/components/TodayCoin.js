import { useAxiosGet } from "../hooks/axiosGet";
import CoinDetail from "./CoinDetail";
import Loading from './Loading'
import styled from 'styled-components'

function TodayCoin({ openModal }) {
  let cryptoList = null;
  let hasCurr = false;
  let randomCurr = null;
  
  // const getDailyCryptoIndex = () => {
  //   const currentTime = Date.now();
  //   const currentDay = Math.floor(currentTime/1000/60/60/24);
  //   const seedrandom = require('seedrandom')
  //   const rng = seedrandom(currentDay);
  //   const cryptosToChooseFrom = 1000;
  //   const dailyCryptoIndex = Math.floor(rng()*cryptosToChooseFrom) + 1;
  //   return dailyCryptoIndex;
  // }

  const dailyCryptoIndex = getDailyCryptoIndex()
  let cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=${dailyCryptoIndex}&sparkline=false`;

  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, []);

  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  if (cryptoList != null) {
    hasCurr = true;
    randomCurr = cryptoList[0];
  }

  return (
      <TodayDiv>
        <Title>Today's coin</Title>
        <br></br>
      {!hasCurr && (
        <Loading marginLeft='33.5'/>
      )}
      {hasCurr && (
        <>
          <div className="todayCoin">
            <CoinDetail crypto={randomCurr} openModal={openModal}></CoinDetail>
          </div>
          </>
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
  min-height: 30rem;
  margin-left: auto;
  margin-right: auto;
  background-color: #f2eee3;
  margin-top: 8rem;
`;

const getDailyCryptoIndex = () => {
  const seedrandom = require('seedrandom');
  const cryptosToChooseFrom = 1000;

  const currentUnixTime = Date.now();
  const currentDay = milliSecondToDay(currentUnixTime);
  
  const rng = seedrandom(currentDay);
  const dailyCryptoIndex = Math.floor(rng()*cryptosToChooseFrom) + 1;
  return dailyCryptoIndex;
}

const milliSecondToDay = ms => {
    return Math.floor(ms/1000/60/60/24);
}

export default TodayCoin;
