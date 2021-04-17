import React,{useState} from 'react'
import {startCreateProduct} from '../../redux/actions/products/productCreateAction'
import {startUpdateProduct} from '../../redux/actions/products/productUpdateAction'
import {useDispatch} from 'react-redux'


const ProductForm =(props)=>{
    const {_id, name : prodName, price : prodPrice, updateClick} = props
    const [name, setProdname] = useState(prodName ? prodName : '')
    const [price, setPrice] = useState(prodPrice ? prodPrice : '')
    const [formErrors, setFormErrors] = useState({})
    const [displayform, setDisplayForm] = useState(true)

    const dispatch = useDispatch()


    const errors = {}
    
    const handleChange = (e)=>{
        const attr = e.target.name

        if(attr==='name'){
            setProdname(e.target.value)
        }
        if(attr==='price'){
            setPrice(e.target.value)
        }
    }

    const runValidations = ()=>{
        if(name.trim().length===0){
            errors.name = `Product name is mandatory`
        }
        if(price.trim().length===0){
            errors.price = `Product Price ?`
        }
    }

    const handleSubmit = (e)=>{
        //for updating products

        if(updateClick){

            setDisplayForm(!displayform)
            e.preventDefault()
            runValidations()
            if(Object.keys(errors).length===0){
                setFormErrors({})
                const createProduct = {
                    name : name,
                    price : price
                }
                console.log('formData', createProduct)
                setProdname('')
                setPrice('')
                dispatch(startUpdateProduct(createProduct, _id))
            }else{
                    setFormErrors(errors)
                    console.log('formErrors', errors)
            }
        }
    else {
        //for new products
        setDisplayForm(!displayform)
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const createProduct = {
                name : name,
                price : price
            }
            console.log('formData', createProduct)
            setProdname('')
            setPrice('')
            dispatch(startCreateProduct(createProduct))

        }else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }
    }
}
    const handleformcancel = ()=>{
        setDisplayForm(!displayform)
    }

    return (
        <div>
            {
                displayform ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' value = {name} name='name' onChange={handleChange} placeholder='Enter Product Name' autoFocus/><br/>
                        {
                            formErrors.name && <div><span style={{color:'red'}}>{formErrors.name}</span><br/></div>
                        }
                        <input type='text' value = {price} name='price' onChange={handleChange} placeholder='Product Price' /><br/>
                        {
                            formErrors.price && <div><span style={{color:'red'}}>{formErrors.price}</span><br/></div>
                        }
                        <input type='submit' value = {updateClick ? 'Update info' : 'Save Product'}/> 
                    </form> 
                    <button onClick={handleformcancel}>Cancel</button>
                </div> : <></>
            }
        </div>
    )
}


export default ProductForm