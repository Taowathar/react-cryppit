import { useAxiosGet } from "../hooks/axiosGet";
import CoinDetail from "./CoinDetail";
import Loading from "./Loading";
import styled from "styled-components";

function TodayCoin({ openModal }) {
  let cryptoList = null;
  let hasCurr = false;
  let randomCurr = null;

  const dailyCryptoIndex = getDailyCryptoIndex();
  let cryptoListURL = `https://localhost:44348/api/cryptolist/${dailyCryptoIndex}/1`;

  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, []);

  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  if (cryptoList != null) {
    if (!localStorage.getItem("dailyCrypto")) {
      let newDailyCrypto = { crypto: "", updated: 0 };
      localStorage.setItem("dailyCrypto", JSON.stringify(newDailyCrypto));
    }
    let dailyCrypto = JSON.parse(localStorage.getItem("dailyCrypto"));
    if (dailyCrypto.updated === milliSecondToDay(Date.now())) {
      randomCurr = dailyCrypto.crypto;
    } else {
      randomCurr = cryptoList[0];
    }
    hasCurr = true;

    let newFetchedDailyCrypto = {
      crypto: randomCurr,
      updated: milliSecondToDay(Date.now()),
    };
    localStorage.setItem("dailyCrypto", JSON.stringify(newFetchedDailyCrypto));
  }

  console.log(randomCurr);
  return (
    <TodayDiv>
      <Title>Today's coin</Title>
      <br></br>
      {!hasCurr && <Loading marginLeft="33.5" />}
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
  const seedrandom = require("seedrandom");
  const cryptosToChooseFrom = 1000;

  const currentUnixTime = Date.now();
  const currentDay = milliSecondToDay(currentUnixTime);

  const rng = seedrandom(currentDay);
  const dailyCryptoIndex = Math.floor(rng() * cryptosToChooseFrom) + 1;
  return dailyCryptoIndex;
};

const milliSecondToDay = (ms) => {
  return Math.floor(ms / 1000 / 60 / 60 / 24);
};

export default TodayCoin;
