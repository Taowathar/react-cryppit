import { useAxiosGet } from "../hooks/axiosGet";
import CoinDetail from "./CoinDetail";
import Loading from "./Loading";
import styled from "styled-components";

function TodayCoin({ openModal }) {
  let dailyCrypto = null;
  let hasCurr = false;
  
  let url = `https://localhost:44348/api/dailycrypto/`;

  const [, fetchedCrypto] = useAxiosGet(url, []);

  if (fetchedCrypto) {
    dailyCrypto = fetchedCrypto;
  }

  if (dailyCrypto != null) {
    hasCurr = true;
  }

  return (
    <TodayDiv>
      <Title>Today's coin</Title>
      <br></br>
      {!hasCurr && <Loading marginLeft="33.5" />}
      {hasCurr && (
        <>
          <div className="todayCoin">
            <CoinDetail crypto={dailyCrypto} openModal={openModal}></CoinDetail>
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

export default TodayCoin;
