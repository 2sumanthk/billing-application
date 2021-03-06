import axios from 'axios'
import swal from 'sweetalert'


export const startRegCustomer = (regCustomer)=>{

    console.log("Action Creator",regCustomer)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers',regCustomer,{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const customers = response.data
            console.log("Customer Reg Response", customers)
            swal({title : 'Customer Successfully Created !!',icon : 'success'})
            dispatch(setRegCustomers(customers))
            //alert("Customer Entry Successfully Created")
        })
        .catch((err)=>{
            const error = err.message
            alert(error)
        })
    }
}

export const setRegCustomers = (customers)=>{
    return {
        type : 'SET_REG_CUST',
        payload : customers
    }
}

