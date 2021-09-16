import Investment from './Investment'

export const InvestmentList = ({investments, openModal}) => {
    console.log("asd", investments)
    return (
        <div style={{textAlign: 'center'}}>
            {investments.map(crypto => (<Investment key={crypto.id} crypto={crypto} openModal={openModal}/>))}
        </div>
    )
}

export default InvestmentList;