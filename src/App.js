import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAxiosGet } from "./hooks/axiosGet";
import CryptoList from "./components/CryptoList";
import FavoriteList from "./components/FavoriteList";
import Header from "./components/Header";
import Home from "./components/Home";
import InvestModal from "./components/InvestModal";
import PortfolioContext from "./context/PortfolioContext";
import HistoryContext from "./context/HistoryContext";

function App() {
  let [currentPage, setCurrentPage] = useState(1);
  let [modalOpen, setModalOpen] = useState(false);
  let [selectedCrypto, setSelectedCrypto] = useState({});

  const pageCount = 459;
  const cryptoPerPage = 20;
  const cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoPerPage}&page=${currentPage}&sparkline=false`;

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

  const portfolioHook = useState({ balance: 100000 });
  const historyHook = useState([]);

  return (
    <PortfolioContext.Provider value={portfolioHook}>
      <HistoryContext.Provider value={historyHook}>
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
                path="/favorites"
                exact
                render={() => (
                  <div className="table-container">
                    <FavoriteList />
                  </div>
                )}
              />
            </Switch>
          </div>
        </Router>
      </HistoryContext.Provider>
    </PortfolioContext.Provider>
  );
}

export default App;
