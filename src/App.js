import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAxiosGet } from "./hooks/axiosGet";
import CryptoList from "./components/CryptoList";
import FavoriteList from "./components/FavoriteList";
import Header from "./components/Header";
import Home from "./components/Home";
import InvestModal from "./components/InvestModal";
import CryptoDetails from "./components/CryptoDetails";
import Portfolio from "./components/Portfolio";
import Register from "./components/Register";

function App() {
  let [currentPage, setCurrentPage] = useState(1);
  let [modalOpen, setModalOpen] = useState(false);
  let [selectedCrypto, setSelectedCrypto] = useState({});
  let [cryptoId, setCryptoId] = useState();
  let [isFavorite, setIsFavorite] = useState();

  const pageCount = 459;
  const cryptoPerPage = 20;
  const cryptoListURL = `https://localhost:44348/api/cryptolist/${currentPage}/${cryptoPerPage}`;

  let cryptoList = null;
  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, [currentPage]);
  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected + 1);
  };

  function openModal(crypto) {
    setSelectedCrypto(crypto);
    setModalOpen(true);
  }

  function modalClose() {
    setModalOpen(false);
  }
  if (localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", 100000);
    localStorage.setItem("portfolio", JSON.stringify({}));
    localStorage.setItem("history", JSON.stringify([]));
  }

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <InvestModal
          crypto={selectedCrypto}
          modalOpen={modalOpen}
          modalClose={modalClose}
        ></InvestModal>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <Home openModal={openModal}></Home>
              </>
            )}
          />
          <Route
            path="/cryptolist"
            exact
            render={() => (
              <>
                <div className="table-container">
                  {cryptoList && (
                    <CryptoList
                      cryptoList={cryptoList}
                      openModal={openModal}
                      setCryptoId={setCryptoId}
                      setSelectedCrypto={setSelectedCrypto}
                      setIsFavorite={setIsFavorite}
                    />
                  )}
                </div>
                <div className="pagination-field">
                  <ReactPaginate
                    initialPage={0}
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination-field"}
                    previousLinkClassName={"page"}
                    breakClassName={"page"}
                    nextLinkClassName={"page"}
                    pageClassName={"page"}
                    disabledClassNae={"disabled"}
                    activeClassName={"active"}
                  />
                </div>
              </>
            )}
          />
          <Route
            path="/details/:cryptoId"
            exact
            render={() => (
              <div className="details-container">
                <CryptoDetails
                  selectedCrypto={selectedCrypto}
                  cryptoId={cryptoId}
                  openModal={openModal}
                  isFavorite={isFavorite}
                />
              </div>
            )}
          />
          <Route
            path="/favorites"
            exact
            render={() => (
              <div className="table-container">
                <FavoriteList
                  openModal={openModal}
                  setCryptoId={setCryptoId}
                  setSelectedCrypto={setSelectedCrypto}
                  setIsFavorite={setIsFavorite}
                />
              </div>
            )}
          />
          <Route
            path="/portfolio"
            exact
            render={() => <Portfolio openModal={openModal} />}
          />
          <Route path="/register" exact render={() => <Register />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
