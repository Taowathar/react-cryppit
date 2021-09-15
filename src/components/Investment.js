import React from "react";
import { useAxiosGet } from "../hooks/axiosGet";
import { timeConverter } from "../converters/UnixTimeConverter";
import { InvestButton } from "./InvestButton";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import Loading from "./Loading";

const Investment = ({ crypto, openModal }) => {
  // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${crypto.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;`https://localhost:44348/api/cryptograph/${crypto.id}}`
  const url = `https://localhost:44348/api/cryptograph/${crypto.id}}`;
  const [, fetchedDetails] = useAxiosGet(url, []);
  let details = null;
  if (fetchedDetails) {
    details = fetchedDetails[0];
  }

  let prices = [];
  let dates = [];
  let pricesUrl = `https://localhost:44348/api/cryptograph/${crypto.id}}`;
  const [, fetchedPrices] = useAxiosGet(pricesUrl, []);
  if (fetchedPrices) {
    for (let price of fetchedPrices.prices) {
      dates.push(timeConverter(price[0]));
      prices.push(price[1]);
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
    <div
      style={{
        margin: "50px",
        display: "inline-block",
        width: "800px",
        height: "450px",
        border: "2px solid black",
        background: "#f2eee3",
      }}
    >
      {!details && <Loading marginTop="10"></Loading>}
      {details && (
        <>
          <div style={{ display: "block", height: "80px" }}>
            <InvestButton
              style={{
                padding: "10px",
                fontSize: "20px",
                width: "100px",
                margin: "10px 20px 10px 10px",
                float: "right",
                transform: "translateY(20%)",
              }}
            >
              Sell
            </InvestButton>
            <InvestButton
              style={{
                padding: "10px",
                fontSize: "20px",
                width: "120px",
                margin: "10px",
                float: "right",
                transform: "translateY(20%)",
              }}
              onClick={() => openModal(details)}
            >
              Buy more
            </InvestButton>
            <h1
              style={{
                display: "inline-block",
                textAlign: "center",
                float: "right",
                marginRight: "50px",
                transform: "translateY(-12%)",
              }}
            >
              <img
                src={details.image}
                alt="logo"
                style={{ width: "50px", height: "50px", paddingRight: "20px" }}
              />
              <div
                style={{
                  display: "inline-block",
                  transform: "translateY(-30%)",
                }}
              >
                {details.name}{" "}
                <span style={{ textTransform: "uppercase" }}>
                  ({details.symbol})
                </span>
              </div>
            </h1>
          </div>
          <div style={{ textAlign: "center" }}>
            <h1
              style={
                details.current_price > crypto.price / crypto.amount
                  ? {
                      color: "green",
                      paddingLeft: "10px",
                      textAlign: "center",
                      marginTop: "0",
                      transform: "translateX(-20%)",
                    }
                  : {
                      color: "red",
                      paddingLeft: "10px",
                      textAlign: "center",
                      marginTop: "0",
                      transform: "translateX(-20%)",
                    }
              }
            >
              <span style={{ float: "right" }}>
                {details.current_price > crypto.price / crypto.amount
                  ? "+"
                  : ""}
                {crypto.price / crypto.amount === 0
                  ? "0.00"
                  : (
                      (details.current_price / (crypto.price / crypto.amount) -
                        1) *
                      100
                    ).toFixed(2)}
                %
              </span>
            </h1>
          </div>
          <div
            style={{
              display: "block",
              textAlign: "left",
              marginLeft: "20px",
              transform: "translateY(-0px)",
            }}
          >
            <h3>Amount owned: {crypto.amount.toLocaleString()}</h3>
            <h3>
              Value when bought: $
              {crypto.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ($
              {(crypto.price / crypto.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              per)
            </h3>
            <h3>
              Current value: $
              {(details.current_price * crypto.amount).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}{" "}
              ($
              {details.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              per){" "}
            </h3>
            <h3>
              Market cap: $
              {details.market_cap.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <h3>
              24h Price change:{" "}
              {details.price_change_percentage_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </h3>
            <h3>
              24h Highest: $
              {details.high_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <h3>
              24h Lowest: $
              {details.low_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <h3>
              All time high: $
              {details.ath.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
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
          </div>
        </>
      )}
    </div>
  );
};

const GraphDiv = styled.div`
  min-width: 28rem;
  max-width: 28rem;
  transform: translate(-5%, -110%);
  float: right;
  margin-top: 2rem;
`;

export default Investment;
