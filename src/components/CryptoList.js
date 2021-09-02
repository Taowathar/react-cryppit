import Crypto from "./Crypto";

const CryptoList = ({ cryptoList, openModal, setCryptoId }) => {
  return (
    <div className="table-container">
      <table>
        <thead >
          <tr id="table-head">
            <th className="table-column-favorite"></th>
            <th className="table-column-logo" style={{textAlign: 'left', transform: 'translateX(22%)'}}>Name</th>
            <th className="table-column-symbol">Symbol</th>
            <th className="table-column-price" style={{padding: '10px'}}>Price (USD)</th>
            <th className="table-column-change" style={{padding: '10px'}}>Change (24h)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <Crypto key={crypto.id} crypto={crypto} openModal={openModal} isFavorite={false} setCryptoId={setCryptoId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
