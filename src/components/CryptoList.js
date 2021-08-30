import Crypto from "./Crypto";

const CryptoList = ({ cryptoList }) => {
  return (
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
          {cryptoList.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;