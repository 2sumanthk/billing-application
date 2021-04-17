import { useDispatch } from 'react-redux'
import {startDeleteCustomer} from '../../redux/actions/customers/customerDeleteAction'


const CustomerDelete = (props)=>{
    const {id} = props
    console.log("id at customer delete component", id)

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