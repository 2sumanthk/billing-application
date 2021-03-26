import axios from 'axios'


export const startDeleteAllCustomers = (allCustomers)=>{
    return (dispatch)=>{
            dispatch(setDeleteAllCustomers(allCustomers))
            //alert("Customer Deleted Successfully Created")
        }
        
    }


export const setDeleteAllCustomers = (allCustomers)=>{
    return {
        type : 'SET_DEL_ALL_CUST',
        payload : allCustomers
    }
}

