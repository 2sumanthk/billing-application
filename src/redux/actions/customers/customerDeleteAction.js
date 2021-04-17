import axios from 'axios'
import swal from 'sweetalert'


export const startDeleteCustomer = (id)=>{

    console.log("Trying to delete id",id)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const deletedCust = response.data
            console.log("Customer delete Response at customerDeleteAction", deletedCust._id)
            dispatch(setDeleteCustomer(deletedCust._id))
            swal({title : 'Customer Record Deleted Successfully',icon : 'success'})
        })
        .catch((err)=>{
            const msg = err.message
            alert("At Delete Action page", msg)
        })
    }
}

export const setDeleteCustomer = (deletedCustID)=>{
    return {
        type : 'SET_DEL_CUST',
        payload : deletedCustID
    }
}

