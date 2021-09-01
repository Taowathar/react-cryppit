import { useAxiosGet } from "../hooks/axiosGet";
import Crypto from "../components/Crypto";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

let currentPage = Math.floor(Math.random() * 457) + 1;
let cryptoPerPage = 20;
let cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoPerPage}&page=${currentPage}&sparkline=false`;
let randomCurrency = Math.floor(Math.random() * 20);

function TodayCoin() {
  let cryptoList = null;
  let cryptoData = null;
  let hasCurr = false;
  let hasData = false;

  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, [currentPage]);

  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  if (cryptoList != null) {
    hasCurr = true;
    let currency = cryptoList[randomCurrency].id;
    let dataUrl = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=30&interval=daily`;

    const [, fetchedCryptoData] = useAxiosGet(dataUrl, []);

    if (fetchedCryptoData) {
      cryptoData = fetchedCryptoData;
    }

    if (cryptoData != null) {
      hasData = true;
    }
  }

  const chartState = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Prices",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

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
        </div>
      )}
    </div>
  );
}

const Title = styled.h1`
  text-align: center;
`;

export default TodayCoin;
