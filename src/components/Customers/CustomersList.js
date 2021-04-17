import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CustomerForm from './CustomerForm'
import {useSelector, useDispatch} from 'react-redux'
import CustomerDelete from './CustomerDelete'
import CustomerUpdate from './CustomerUpdate'
import {startDeleteAllCustomers} from '../../redux/actions/customers/customerDeleteAllAction'
import {startListCustomers} from '../../redux/actions/customers/customersListAction'


const CustomersList = (props)=>{

    const [listCustomers, setListCustomers] = useState([])
    const [createCust, setCreateCust] = useState(false)

    const customers = useSelector((state)=>{
        return state.customers_info
    })

    console.log("from store state customers_info",customers)

    const dispatch = useDispatch()


    useEffect(()=>{
    setListCustomers(customers)

    /* This dispatch function for listing of customers gets called everytime the customer list gets updated 
    and once during every refresh */

    dispatch(startListCustomers())

    },[customers])

    const handleCustCreate = ()=>{
        setCreateCust(!createCust)
    }

    // const handleDeleteAllCustomers = ()=>{
    //     console.log(listCustomers)
    //     dispatch(startDeleteAllCustomers(listCustomers))
    // }

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <button onClick={handleCustCreate}>Create a Customer</button>
            {/* <button onClick={handleDeleteAllCustomers}>Delete All Customers</button> */}
            {createCust ? <CustomerForm/> : <></>}
            {
                listCustomers.length ===0 && customers.length===0 ? 
                <table border={1} >
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Mobile</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td colSpan={3}>Click on create button to Create a new Customer</td>
                        </tr>
                    </tbody>
                </table> : 

                /*customers.length === 0? <div>{`Loading customer data...`}</div> :*/

                <table border={1}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Mobile</td>
                            <td>Email</td>
                            <td>Update</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listCustomers.map((cust)=>{
                            return (
                                <tr key={cust._id}>
                                    <td>{cust.name}</td>
                                    <td>{cust.mobile}</td>
                                    <td>{cust.email}</td>
                                    <td><CustomerUpdate {...cust}/></td>
                                    <td><CustomerDelete id={cust._id}/></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                
                
            }

            <div><h3>Total Customers - {listCustomers.length}</h3></div>

            <Link to='/home'>Back to Home</Link>
        </div>
    )
}

export default CustomersList