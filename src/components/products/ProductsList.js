import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProductForm from './ProductForm'
import ProductDelete from './ProductDelete'
import ProductUpdate from './productUpdate'



const ProductsList = (props)=>{

    const [listProducts, setListProducts] = useState([])
    const [createProd, setCreateProd] = useState(false)

    const products = useSelector((state)=>{
        return state.products_info
    })

    console.log("from store state customers_info",products)


    const loggedInUserToken = localStorage.getItem('token')
    console.log("Received token at ProductsList comp", loggedInUserToken)

    useEffect(()=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/products',{
        headers :{
            Authorization : `Bearer ${loggedInUserToken}`
        }
    })
    .then((response)=>{
        const result = response.data
        setListProducts(result)

    })
    .catch((err)=>{
        const msg = err.message
        alert('Error while listing products, ProductsList comp',msg)
    })
    },[products])

    const handleProdCreate = ()=>{
        setCreateProd(!createProd)
    }


    return (
        <div>
            <h1>Customer Dashboard</h1>
            <button onClick={handleProdCreate}>Create a Product</button>
    
            {createProd ? <ProductForm/> : <></>}
            {
                listProducts.map((prod)=>{
                    console.log(prod)
                    return (
                        <li key={prod._id}>{prod.name} - Rs. {prod.price} <ProductUpdate {...prod}/><ProductDelete id={prod._id}/></li>
                    )
                })
            }

            <div><h3>Total Products - {listProducts.length}</h3></div>
            <Link to='/home'>Back to Home</Link>
        </div>
    )
}

export default ProductsList