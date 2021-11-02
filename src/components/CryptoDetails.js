import { useAxiosGet } from "../hooks/axiosGet";
import { timeConverter } from "../converters/UnixTimeConverter";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loading from "./Loading";
import axios from "axios";

const CryptoDetails = ({
  cryptoId,
  selectedCrypto,
  openModal,
  isFavorite,
  user,
}) => {
  if (user === undefined) {
    user = { id: "1" };
  }

  const [favorite, setfavorite] = useState(isFavorite);
  let [, storage] = useAxiosGet(
    `https://localhost:44348/api/favorite/${user.id}`,
    []
  );
  const cryptoURL = `https://localhost:44348/api/cryptodetail/${cryptoId}`;
  const cryptoDataURL = `https://localhost:44348/api/cryptograph/${cryptoId}`;
  let dates = [];
  let prices = [];
  let hasData = false;

  useEffect(() => {
    if (storage) {
      for (let cryp of storage) {
        if (cryp.id === cryptoId) {
          setfavorite(true);
        }
      }
    }
  }, [storage]);

  const changeFavorite = () => {
    console.log(selectedCrypto)
    setfavorite(!favorite);
    if (favorite) {
      axios.delete(`https://localhost:44348/api/favorite/${crypto.id}/${user.id}`);
    } else {
      axios.post(`https://localhost:44348/api/favorite/${user.id}`, selectedCrypto);
    }
  };

  let crypto = null;
  let cryptoData = null;
  const [, fetchedCrypto] = useAxiosGet(cryptoURL, []);
  const [, fetchedCryptoData] = useAxiosGet(cryptoDataURL, []);

  if (fetchedCryptoData && fetchedCrypto) {
    crypto = fetchedCrypto;
    cryptoData = fetchedCryptoData;
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
      <h1>Crypto's details</h1>
      {!hasData && <Loading marginLeft="0" />}
      {hasData && (
        <>
          <ButtonsDiv>
            <div className="favoriteButton" onClick={changeFavorite}>
              {favorite ? (
                <AiFillHeart size={50} />
              ) : (
                <AiOutlineHeart size={50} />
              )}
            </div>
            <div>
              <InvestButton onClick={() => openModal(selectedCrypto)}>
                Invest
              </InvestButton>
            </div>
          </ButtonsDiv>

          <TodayContainer>
            <div>
              <h2>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </h2>
              <h4>
                Current price:{" "}
                {crypto.market_data.current_price.usd.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}{" "}
                USD
              </h4>
              <h4>
                Market cap:{" "}
                {crypto.market_data.market_cap.usd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </h4>
              <h4>
                24h Highest:{" "}
                {crypto.market_data.high_24h.usd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </h4>
              <h4>
                24h Lowest:{" "}
                {crypto.market_data.low_24h.usd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </h4>
              <h4>
                24h Price change:{" "}
                {crypto.market_data.price_change_percentage_24h.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
                %
              </h4>
              <h4>
                All time high:{" "}
                {crypto.market_data.ath.usd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </h4>
              <h4>
                Total volume:{" "}
                {crypto.market_data.total_volume.usd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h4>
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
  margin-bottom: -2rem;
  margin-top: -1rem;
`;

export default CryptoDetails;
