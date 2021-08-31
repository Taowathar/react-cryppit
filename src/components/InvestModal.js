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

    useEffect(() => {
       setIsOpen(modalOpen)
    }, [modalOpen])


    function afterOpenModal() {
        subtitle.style.color = '#0f870f';
    }

    function closeModal() {
        setIsOpen(false);
        modalClose();
    }

    function setUsd(e) {
        setUsdAmount(e)
        setCryptoAmount(+(e/crypto.current_price).toFixed(10))
    }

    function setCrypto(e) {
        setCryptoAmount(e)
        setUsdAmount(+(e*crypto.current_price).toFixed(2))
    }

    function buy(e) {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
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
            <div className="currency-input" currency="USD">
          <InputNumber style={{fontSize: '16px', width: '150px'}} value={usdAmount} onChange={setUsd}/>
          </div>
          <div className="currency-input" currency={crypto.symbol}>
          <InputNumber style={{fontSize: '16px', width: '150px'}} value={cryptoAmount} onChange={setCrypto}/>
          </div>
        <div style={{marginTop: '20px'}}>
        <Button type="submit" style={{marginLeft: '70px'}}>Buy</Button>
        <Button style={{float: 'right', marginRight: '70px'}} onClick={closeModal}>Cancel</Button>
        </div>
        </form>
      </Modal>
    )
}

export default InvestModal
