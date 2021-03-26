import axios from 'axios'


export const startRemoveProduct = (id)=>{

    console.log("Trying to remove product with id",id)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const deletedProd = response.data
            console.log("Customer delete Response", deletedProd._id)
            dispatch(setDeleteCustomer(deletedProd._id))
            alert("Product Removed Successfully ")
        })
        .catch((err)=>{
            const msg = err.message
            alert("At Delete Action page", msg)
        })
    }
}

export const setDeleteCustomer = (deletedProdID)=>{
    return {
        type : 'SET_DEL_PROD',
        payload : deletedProdID
    }
}

