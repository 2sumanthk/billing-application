import axios from 'axios'


export const startUpdateCustomer = (updatedCustomer,id)=>{

    console.log("Trying to update this -----> id",id)
    console.log('trying to get this updated data', updatedCustomer)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,updatedCustomer,{
            headers:{
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log("updated customer", response)
            const updatedCust = response.data
            console.log("Customer update Response", updatedCust)

            dispatch(setUpdateCustomer(updatedCust))
            //alert("Customer Updated Successfully")
        })
        .catch((err)=>{
            const msg = err.message
            alert("At Update Action page", msg)
        })
    }
}

export const setUpdateCustomer = (updatedCust)=>{
    return {
        type : 'SET_UPDATE_CUST',
        payload : updatedCust
    }
}

