import { useDispatch } from 'react-redux'
import {startRemoveProduct} from '../../redux/actions/products/productRemoveAction'


const ProductDelete = (props)=>{
    const {id} = props

    const dispatch = useDispatch()

    const handleRemove = (id)=>{
        dispatch(startRemoveProduct(id))
    }

    return (
        <button onClick={()=>{
            handleRemove(id)
        }}>Remove</button>
    )
}

export default ProductDelete