import axios from 'axios'


export const startGetProduct = (createProduct)=>{

    console.log("Action Creator",createProduct)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/products',createProduct,{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const products = response.data
            console.log("Product Create Response", products)
            dispatch(setCreateProducts(products))
            alert("Product Entry Successfully Created")
        })
        .catch((err)=>{
            const error = err.message
            alert(error)
        })
    }
}

export const setCreateProducts = (products)=>{
    return {
        type : 'SET_CREATE_PROD',
        payload : products
    }
}

