import axios from 'axios'


export const startListProduct = ()=>{

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products',{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log(response)
            const products = response.data
            console.log("Listing Products Response", products)
            dispatch(setListProducts(products))
            
        })
        .catch((err)=>{
            const error = err.message
            alert(error)
        })
    }
}

export const setListProducts = (products)=>{
    return {
        type : 'SET_LIST_PROD',
        payload : products
    }
}

