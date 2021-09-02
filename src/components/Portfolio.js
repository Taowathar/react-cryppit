
import React, {useContext, useState, useEffect} from 'react'
import { useAxiosGet } from '../hooks/axiosGet';
import InvestmentList from './InvestmentList';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';


const Portfolio = () => {
    const portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let sum = 0;
    let totalPrice = 0;
    const balance = parseFloat(localStorage.getItem('balance'));

    const ids = Object.keys(portfolio);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join('%2C')}&vs_currencies=usd`;
    const [, fetchedPrices] = useAxiosGet(url, [1]);
    let hasLoaded = false;

    
    const getSortedInvestmentList = () => {
        let investmentList = [];
        const keys = Object.keys(portfolio);
        keys.forEach(key => {
            portfolio[key].id = key;
            investmentList.push(portfolio[key])
        })
        investmentList.sort((a, b) => (a.price < b.price) ? 1 : -1);
        return investmentList;
    }
    
        
    const [currentPage, setCurrentPage] = useState(1);
    const investmentsPerPage = 2;
    const pageCount = Math.ceil(Object.keys(portfolio).length / investmentsPerPage);
    
    const investmentList = getSortedInvestmentList();
    let startIndex = (currentPage-1) * investmentsPerPage;
    let maxIndex = startIndex + investmentsPerPage < investmentList.length ? startIndex + investmentsPerPage : investmentList.length;
    let investmentsToDisplay = [];
    for (let i = startIndex; i < maxIndex; i++) {
        investmentsToDisplay.push(investmentList[i]);
    }
    console.log(currentPage, investmentsToDisplay, investmentList, maxIndex);
    

    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected + 1);
    };
    

    if (fetchedPrices) {
        Object.keys(fetchedPrices).forEach(id => {
            sum += portfolio[id].amount * fetchedPrices[id].usd;
            totalPrice += portfolio[id].price;
        });
        hasLoaded = true;
    }
    
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: '36px'}}>Portfolio</h1>

                <h2 style={{textAlign: 'center'}}>Value: ${sum.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})} <span style={sum > totalPrice ? {color: 'green', paddingLeft: '10px'} : {color: 'red', paddingLeft: '10px'}}>{sum > totalPrice ? '+' : ''}{totalPrice === 0 ? '0.00' : ((sum/totalPrice-1)*100).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}%</span></h2>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Remaining balance: ${balance.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</h3>
            <h3 style={{textAlign: 'center', marginTop: '5px'}}>Total funds: ${(balance + sum).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</h3>
            <InvestmentList investments={investmentsToDisplay}></InvestmentList>
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
        </div>
    )
}

export default Portfolio
