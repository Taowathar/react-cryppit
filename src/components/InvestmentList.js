import React, {useState, useEffect} from 'react'
import Investment from './Investment'

export const InvestmentList = () => {
    const [investmentList, setInvestmentList] = useState([]);

    useEffect(() => {
        setInvestmentList([]);
        const portfolio = JSON.parse(localStorage.getItem('portfolio'));
        const keys = Object.keys(portfolio);
        keys.forEach(key => {
            portfolio[key].id = key;
            setInvestmentList(list => [...list, portfolio[key]])
        })
        investmentList.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }, [])
    console.log(investmentList);


    return (
        <div>
            {investmentList.map(crypto => (<Investment key={crypto.id} crypto={crypto}/>))}
        </div>
    )
}

export default InvestmentList;