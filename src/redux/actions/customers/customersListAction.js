import axios from 'axios'


export const startListCustomers = ()=>{

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const customers = response.data
            console.log("Customers Listing", customers)
            dispatch(setListCustomers(customers))
        })
        .catch((err)=>{
            const error = err.message
            alert(error)
        })
    }
}

export const setListCustomers = (customers)=>{
    return {
        type : 'SET_LIST_CUSTS',
        payload : customers
    }
}

