import React, {useState, useEffect} from 'react'
import Investment from './Investment'

export const InvestmentList = ({investments}) => {
    


    return (
        <div>
            {investments.map(crypto => (<Investment key={crypto.id} crypto={crypto}/>))}
        </div>
    )
}

export default InvestmentList;