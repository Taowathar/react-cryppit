import Crypto from "./Crypto";

const CryptoList = ({ cryptoList, openModal }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Favorite</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} openModal={openModal}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
