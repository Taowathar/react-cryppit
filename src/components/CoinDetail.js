import { useAxiosGet } from "../hooks/axiosGet";
import { timeConverter } from "../converters/UnixTimeConverter";
import { Line } from "react-chartjs-2";
import { assertArrayTypeAnnotation } from "@babel/types";

const CoinDetail = (currency) => {
  let cryptoData = null;
  let hasData = false;
  let dates = [];
  let prices = [];

  let dataUrl = `https://api.coingecko.com/api/v3/coins/${currency.currency}/market_chart?vs_currency=usd&days=30&interval=daily`;

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
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CoinDetail;
