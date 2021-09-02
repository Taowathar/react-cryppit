
import React, {useContext, useState, useEffect} from 'react'
import { useAxiosGet } from '../hooks/axiosGet';
import InvestmentList from './InvestmentList';


const Portfolio = () => {
    const portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let sum = 0;
    let totalPrice = 0;
    const balance = parseFloat(localStorage.getItem('balance'));

    const ids = Object.keys(portfolio);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join('%2C')}&vs_currencies=usd`;
    const [, fetchedPrices] = useAxiosGet(url, [1]);


    if (fetchedPrices) {
        Object.keys(fetchedPrices).forEach(id => {
            sum += portfolio[id].amount * fetchedPrices[id].usd;
            totalPrice += portfolio[id].price;
        });    
    }
    
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: '36px'}}>Portfolio</h1>
            <h2 style={{textAlign: 'center'}}>Value: ${sum.toFixed(2)} <span style={sum > totalPrice ? {color: 'green', paddingLeft: '10px'} : {color: 'red', paddingLeft: '10px'}}>{sum > totalPrice ? '+' : ''}{totalPrice === 0 ? '0.00' : ((sum/totalPrice-1)*100).toFixed(2)}%</span></h2>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Remaining balance: ${balance}</h3>
            <h3 style={{textAlign: 'center', marginTop: '5px'}}>Total funds: ${+(balance + sum).toFixed(2)}</h3>
            <InvestmentList></InvestmentList>
        </div>
    )
}

export default Portfolio
