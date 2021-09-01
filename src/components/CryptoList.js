import Crypto from "./Crypto";

const CryptoList = ({ cryptoList, openModal }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{textAlign: 'left', transform: 'translateX(22%)'}}>Name</th>
            <th>Symbol</th>
            <th style={{padding: '10px'}}>Price (USD)</th>
            <th style={{padding: '10px'}}>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} openModal={openModal} isFavorite={false} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
