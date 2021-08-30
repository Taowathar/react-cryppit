const Crypto = (crypto) => {
  return (
    <tr>
      <td></td>
      <td>
        <div className="table-data-name">
          <img className="crypto-img" src={crypto.crypto.image} alt="logo" />
          {crypto.crypto.name}
          <span>{crypto.crypto.symbol}</span>
        </div>
      </td>
      <td>{crypto.crypto.current_price}</td>
      <td>{crypto.crypto.price_change_percentage_24h}</td>
    </tr>
  );
};

export default Crypto;
