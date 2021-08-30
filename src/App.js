import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useAxiosGet } from "./hooks/axiosGet";
import CryptoList from "./components/CryptoList";

function App() {
  let [currentPage, setCurrentPage] = useState(1);

  const pageCount = 100;


  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
  };

  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() => (
            <>
              <div className="pagination-field">
                <ReactPaginate
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
      </div>
    </Router>
  );
}

export default App;
