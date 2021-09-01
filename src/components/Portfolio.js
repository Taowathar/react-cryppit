import React, {useContext, useState, useEffect} from 'react'
import PortfolioContext from '../context/PortfolioContext'
import { useAxiosGet } from '../hooks/axiosGet';


const Portfolio = () => {
    const [portfolio] = useContext(PortfolioContext);
    let sum = 0;
    let totalPrice = 0;
    
    const ids = Object.keys(portfolio.owned);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join('%2C')}&vs_currencies=usd`;
    const [, fetchedPrices] = useAxiosGet(url, [1]);


    if (fetchedPrices) {
        console.log(fetchedPrices);
        Object.keys(fetchedPrices).forEach(id => {
            console.log(sum, fetchedPrices[id].usd, portfolio.owned[id].amount, portfolio.owned[id].amount * fetchedPrices[id].usd);
            sum += portfolio.owned[id].amount * fetchedPrices[id].usd;
            totalPrice += portfolio.owned[id].price;
        });    
    }
    
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Portfolio</h1>
            <h2 style={{textAlign: 'center'}}>Value: ${sum.toFixed(2)} <span style={sum > totalPrice ? {color: 'green', paddingLeft: '10px'} : {color: 'red', paddingLeft: '10px'}}>{sum > totalPrice ? '+' : ''}{totalPrice === 0 ? '0.00' : ((sum/totalPrice-1)*100).toFixed(2)}%</span></h2>
            <h3 style={{textAlign: 'center'}}>Remaining balance: ${portfolio.balance}</h3>
        </div>
    )
}

export default Portfolio
