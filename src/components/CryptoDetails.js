import { useAxiosGet } from "../hooks/axiosGet";

const CryptoDetails = ({ cryptoId }) => {

  const cryptoURL = `https://api.coingecko.com/api/v3/coins/${cryptoId}`;


  let crypto = null;
  const [, fetchedCryptoList] = useAxiosGet(cryptoURL, []);
  if (fetchedCryptoList) {
    crypto = fetchedCryptoList;
  }

  return (
    <div>

    </div>
  );
};

export default CryptoDetails;
