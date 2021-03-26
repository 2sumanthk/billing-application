import { useDispatch } from 'react-redux'
import {startDeleteCustomer} from '../../redux/actions/customerDeleteAction'


const CustomerDelete = (props)=>{
    const {id} = props

    const dispatch = useDispatch()

    const handleDelete = (id)=>{
        dispatch(startDeleteCustomer(id))
    }

    return (
        <button onClick={()=>{
            handleDelete(id)
        }}>Delete</button>
    )
}

export default CustomerDelete