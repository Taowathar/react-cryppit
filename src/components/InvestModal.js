import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const InvestModal = ({crypto, modalOpen, modalClose}) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(modalOpen)
        console.log(crypto);
    }, [modalOpen, crypto])


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#0f870f';
  }

  function closeModal() {
    setIsOpen(false);
    modalClose();
  }

    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{textAlign: 'center'}} ref={(_subtitle) => (subtitle = _subtitle)}>Buy <span style={{margin: 0}}>{crypto.symbol}</span></h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    )
}

export default InvestModal
