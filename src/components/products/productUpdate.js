import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import ProductForm from './ProductForm'


const ProductUpdate = (props)=>{
    const {_id, name, price} = props
    const [updateClick, setUpdateClick] = useState(false)

    const handleUpdate = (pid)=>{
        if(_id===pid){
            setUpdateClick(!updateClick)
        }
    }

    return (
        <span>
            <button onClick={()=>{
                handleUpdate(_id)
            }}>Update</button>
            {updateClick ? <ProductForm {...props} updateClick={updateClick}/> : <></>}
        </span>
        
    )
}

export default ProductUpdate
