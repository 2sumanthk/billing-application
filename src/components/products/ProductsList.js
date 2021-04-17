import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ProductForm from './ProductForm'
import ProductDelete from './ProductDelete'
import ProductUpdate from './productUpdate'
import {startListProduct} from '../../redux/actions/products/productListAction'



const ProductsList = (props)=>{

    const [listProducts, setListProducts] = useState([])
    const [createProd, setCreateProd] = useState(false)

    const products = useSelector((state)=>{
        return state.products_info
    })

    console.log("from store state products_info",products)

    const dispatch = useDispatch()

    useEffect(()=>{
        /* This dispatch function for listing of products gets called everytime the product list gets updated 
        and once during every refresh */
        
        dispatch(startListProduct())
        setListProducts(products)
    },[products])

    const handleProdCreate = ()=>{
        setCreateProd(!createProd)
    }


    return (
        <div>
            <h1>Product Listing</h1>
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