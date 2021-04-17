import React from 'react'
import { useSelector } from 'react-redux'
import BillItem from './BillItem'

const BillingList = (props) =>{
    
    const bills = useSelector((state) =>{
        return state.bills
    })
   
    return (
        <div>
            <h2>Bills List</h2>
           
            {bills.map((ele,i) =>{
                return <BillItem key={i} {...ele}  />
            })}

        </div>
    )
}
export default BillingList