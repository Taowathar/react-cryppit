import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import InputNumber from 'react-input-number';
import styled from 'styled-components';

const customStyles = {
  content: {
    paddingTop: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Button = styled.button`
    width: 80px;
    font-weight: bold;
    padding: 8px;
    margin-right: 8px;
    background-color: #0f870f;
    color: white;
    border: 0;
    border-radius: .5rem;
    cursor: pointer;
    font-size: 16px;
`

Modal.setAppElement('#root');

const InvestModal = ({crypto, modalOpen, modalClose}) => {
    let subtitle;
    const [usdAmount, setUsdAmount] = useState(crypto.current_price);
    const [cryptoAmount, setCryptoAmount] = useState(1);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const history = JSON.parse(localStorage.getItem('history'));
    let balance = localStorage.getItem('balance');
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    const [overBalance, setOverBalance] = useState('false');
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
       setIsOpen(modalOpen)
       setUsdAmount(crypto.current_price);
       setCryptoAmount(1);
       setOverBalance(crypto.current_price > balance ? true : false)
    }, [modalOpen, crypto.current_price, balance])
    
    function afterOpenModal() {
        subtitle.style.color = '#0f870f';
    }
    
    function closeModal() {
        setErrorMessage('');
        setIsOpen(false);
        modalClose();
    }
    
    function setUsd(inputValue) {
        setOverBalance(inputValue > balance);
        if(inputValue < 0){
            inputValue = 0;
        }
        setUsdAmount(inputValue);
        const decimalPlaces = 10;
        setCryptoAmount(+(inputValue/crypto.current_price).toFixed(decimalPlaces))
    }

    function setCrypto(inputValue) {
        const totalUsd = inputValue*crypto.current_price;
        setOverBalance(totalUsd > balance);
        if(inputValue < 0){
            inputValue = 0;
        }
        setCryptoAmount(inputValue);
        const decimalPlaces = 2;
        setUsdAmount(+(totalUsd).toFixed(decimalPlaces));
    }

    function buy(e) {
        e.preventDefault();
        if (overBalance) {
            setErrorMessage('Not enough funds!');
        } else {
            const price = parseFloat(e.target[0].value);
            const boughtAmount = parseFloat(e.target[1].value);
            if (crypto.id in portfolio) {
                portfolio[crypto.id]['amount'] += boughtAmount;
                portfolio[crypto.id]['price'] += price;
            } else {
                let purchase = {'amount' : boughtAmount, 
                                'price' : price}
                portfolio[crypto.id] = purchase;
            }
            localStorage.setItem('balance', +(localStorage.getItem('balance') - price).toFixed(2))
            localStorage.setItem('portfolio', JSON.stringify(portfolio))
            const newPurchase = {
                date: new Date(),
                crypto: crypto,
                price: price,
                amount: boughtAmount,
                buy: true
            }
            history.push(newPurchase);
            localStorage.setItem('history', JSON.stringify(history));
            modalClose();
        }
    }

    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{textAlign: 'center', fontSize: '30px'}} ref={(_subtitle) => (subtitle = _subtitle)}>Buy {crypto.name}</h2>

        
        <form onSubmit={buy}>
            <label style={{display: 'block', fontStyle: 'italic', fontSize: '18px', paddingBottom: '6px'}}>Balance: ${balance}</label>
            <div className="currency-input" currency="USD">
          <InputNumber id='usd-input' style={overBalance ? {backgroundColor: '#ff8080', fontSize: '16px', width: '150px'} : {backgroundColor: 'white', fontSize: '16px', width: '150px'}} value={usdAmount} onChange={setUsd} max={portfolio['balance']}/>
          </div>
          <div className="currency-input" currency={crypto.symbol}>
          <InputNumber style={{fontSize: '16px', width: '150px'}} value={cryptoAmount} onChange={setCrypto}/>
          </div>
        <div style={{marginTop: '20px'}}>   
        <Button type="submit" style={{marginLeft: '70px'}}>Buy</Button>
        <Button style={{float: 'right', marginRight: '70px'}} onClick={closeModal}>Cancel</Button>
        </div>
        {errorMessage && (<p style={{color: 'red'}}> {errorMessage} </p>)}
        </form>
      </Modal>
    )
}

export default InvestModal
