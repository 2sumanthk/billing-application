import axios from 'axios'


export const startUpdateProduct = (updatedProduct,id)=>{

    console.log("Trying to update this -----> id",id)
    console.log('trying to get this updated data', updatedProduct)

    const loggedInUserToken = localStorage.getItem('token')

    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,updatedProduct,{
            headers:{
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            console.log("updated Product", response)
            const updatedProd = response.data
            console.log("Product update Response", updatedProd)

            dispatch(setUpdateProduct(updatedProd))
            //alert("Product Updated Successfully")
        })
        .catch((err)=>{
            const msg = err.message
            alert("At Update Action page", msg)
        })
    }
}

export const setUpdateProduct = (updatedProd)=>{
    return {
        type : 'SET_UPDATE_PROD',
        payload : updatedProd
    }
}

