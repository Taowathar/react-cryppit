import { useAxiosGet } from "../hooks/axiosGet";
import { timeConverter } from "../converters/UnixTimeConverter";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

const CoinDetail = ({ currency, openModal }) => {
  let cryptoData = null;
  let hasData = false;
  let dates = [];
  let prices = [];

  let dataUrl = `https://api.coingecko.com/api/v3/coins/${currency.id}/market_chart?vs_currency=usd&days=30&interval=daily`;

  const [, fetchedCryptoData] = useAxiosGet(dataUrl, []);

  if (fetchedCryptoData) {
    cryptoData = fetchedCryptoData;
  }

  if (cryptoData != null) {
    hasData = true;
    for (let detail of cryptoData.prices) {
      dates.push(timeConverter(detail[0]));
      prices.push(detail[1]);
    }
  }

  function onClick() {
    openModal(currency);
  }

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Price",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: prices,
      },
    ],
  };

  return (
    <div>
      {hasData && (
        <TodayContainer>
          <InvestButton onClick={onClick}>Invest</InvestButton>
          <div>
            <h2>
              {currency.name} ({currency.symbol.toUpperCase()})
            </h2>
            <h4>Current price: {currency.current_price} USD</h4>
            <h4>Market cap: {currency.market_cap} USD</h4>
            <h4>24h Highest: {currency.high_24h} USD</h4>
            <h4>24h Lowest: {currency.low_24h} USD</h4>
            <h4>24h Price change: {currency.price_change_percentage_24h} %</h4>
            <h4>All time high: {currency.ath} USD</h4>
            <h4>Total volume: {currency.total_volume}</h4>
          </div>
          <GraphDiv>
            <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Crypto prices from the last 30 days",
                  fontSize: 20,
                },
                legend: {
                  display: false,
                },
                elements: {
                  point: {
                    radius: 0,
                    pointHitRadius: 5,
                  },
                },
              }}
            />
          </GraphDiv>
        </TodayContainer>
      )}
    </div>
  );
};

const GraphDiv = styled.div`
  min-width: 33rem;
  max-width: 33rem;
  float: right;
  margin-top: 2rem;
`;

const TodayContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 1rem;
`;

const InvestButton = styled.button`
  padding: 8px;
  background-color: #0bba0b;
  color: white;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default CoinDetail;
