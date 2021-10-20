import { useAxiosGet } from "../hooks/axiosGet";
import { timeConverter } from "../converters/UnixTimeConverter";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loading from "./Loading";
import axios from "axios";

const CoinDetail = ({ crypto, openModal, user }) => {
  if (user === undefined) {
    user = { id: "1" };
  }

  let cryptoData = null;
  let hasData = false;
  let dates = [];
  let prices = [];

  let dataUrl = `https://localhost:44348/api/cryptograph/${crypto.id}`;

  const [, fetchedCryptoData] = useAxiosGet(dataUrl, []);
  const [favorite, setfavorite] = useState(false);
  let [, storage] = useAxiosGet(
    `https://localhost:44348/api/favorite/${user.id}`,
    []
  );

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

  useEffect(() => {
    console.log("cryp");
    if (storage) {
      for (let cryp of storage) {
        if (cryp.id === crypto.id) {
          setfavorite(true);
        }
      }
    }
  }, [storage]);

  const changeFavorite = () => {
    setfavorite(!favorite);
    if (favorite) {
      axios.delete(`https://localhost:44348/api/favorite/${crypto.id}`);
    } else {
      axios.post(`https://localhost:44348/api/favorite/${user.id}`, crypto);
    }
  };

  function onClick() {
    openModal(crypto);
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
      {!hasData && <Loading marginLeft="33.5"></Loading>}
      {hasData && (
        <>
          <ButtonsDiv>
            <div className="favoriteButton" onClick={changeFavorite}>
              {favorite ? (
                <AiFillHeart size={30} />
              ) : (
                <AiOutlineHeart size={30} />
              )}
            </div>
            <div>
              <InvestButton onClick={onClick}>Invest</InvestButton>
            </div>
          </ButtonsDiv>

          <TodayContainer>
            <div style={{ marginTop: "-2rem" }}>
              <h2>
                <img
                  src={crypto.image}
                  alt="logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "0.4rem",
                  }}
                />
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </h2>
              <h4>
                Current price: {crypto.current_price.toLocaleString()} USD
              </h4>
              <h4>Market cap: {crypto.market_cap.toLocaleString()} USD</h4>
              <h4>24h Highest: {crypto.high_24h.toLocaleString()} USD</h4>
              <h4>24h Lowest: {crypto.low_24h.toLocaleString()} USD</h4>
              <h4>
                24h Price change:{" "}
                {crypto.price_change_percentage_24h.toLocaleString()} %
              </h4>
              <h4>All time high: {crypto.ath.toLocaleString()} USD</h4>
              <h4>Total volume: {crypto.total_volume.toLocaleString()}</h4>
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
        </>
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
  margin-left: 2rem;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -1rem;
  margin-bottom: -1.5rem;
`;

export default CoinDetail;
