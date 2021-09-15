import React, {useState} from 'react'
import { useAxiosGet } from '../hooks/axiosGet';
import InvestmentList from './InvestmentList';
import ReactPaginate from 'react-paginate';
import { createGlobalStyle } from 'styled-components';


const Portfolio = ({openModal}) => {
    // const portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let sum = 0;
    let totalPrice = 0;
    const balance = parseFloat(localStorage.getItem('balance'));

    // const ids = Object.keys(portfolio);
    // const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join('%2C')}&vs_currencies=usd`;
    const url = `https://localhost:44348/api/investmentlist/9df35e81bdde45cdbf4fa280bf21aae7`; // param: userId
    const [, portfolio] = useAxiosGet(url, []);

    
    const getSortedPortfolio = () => {
        // let investmentList = [];
        // const keys = Object.keys(portfolio);
        // keys.forEach(key => {
        //     portfolio[key].id = key;
        //     investmentList.push(portfolio[key])
        // })
        portfolio.sort((a, b) => (a.price < b.price) ? 1 : -1);
        return portfolio;
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    let investmentsToDisplay = [];
    let pageCount = 0;
    let investmentList = [];

    if (portfolio) {
        // Object.keys(fetchedPrices).forEach(id => {
        //     sum += portfolio[id].amount * fetchedPrices[id].usd;
        //     totalPrice += portfolio[id].price;
        // });
        portfolio.forEach(inv => {
            sum += inv.amount * inv.current_price;
            totalPrice += inv.price;
        })  
        
        const investmentsPerPage = 2;
        // const pageCount = Math.ceil(Object.keys(portfolio).length / investmentsPerPage);
        pageCount = Math.ceil(portfolio.length / investmentsPerPage);
        
        investmentList = getSortedPortfolio();
        let startIndex = (currentPage-1) * investmentsPerPage;
        let maxIndex = startIndex + investmentsPerPage < investmentList.length ? startIndex + investmentsPerPage : investmentList.length;
        for (let i = startIndex; i < maxIndex; i++) {
            investmentsToDisplay.push(investmentList[i]);
        }
        console.log(investmentsToDisplay)
    }
    

    

    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected + 1);
    };
    
    
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
            <InvestmentList investments={investmentsToDisplay} openModal={openModal}></InvestmentList>
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
