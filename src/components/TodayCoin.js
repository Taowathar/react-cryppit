import { useAxiosGet } from "../hooks/axiosGet";
import styled from "styled-components";
import CoinDetail from "./CoinDetail";
import { Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

let currentPage = Math.floor(Math.random() * 50) + 1;
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
    <>
      {!hasCurr && (
        <div class="d-flex justify-content-center">
          <h1>
            <Spinner
              style={{
                marginLeft: "3.3rem",
                marginTop: "25rem",
              }}
              as="span"
              variant="dark"
              size="large"
              role="status"
              aria-hidden="true"
              animation="border"
            />
            <br></br>
            Loading...
          </h1>
        </div>
      )}

      {hasCurr && (
        <TodayDiv>
          <Title>Today's coin</Title>
          <br></br>
          <div className="todayCoin">
            <CoinDetail crypto={randomCurr} openModal={openModal}></CoinDetail>
          </div>
        </TodayDiv>
      )}
    </>
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

const Spin = styled(Spinner)``;

export default TodayCoin;
