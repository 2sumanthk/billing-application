import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import CustomerForm from './CustomerForm'

const CustomerUpdate = (props)=>{
    const {_id, name, mobile, email} = props
    const [updateClick, setUpdateClick] = useState(false)

    const handleUpdate = (cid)=>{
        if(_id===cid){
            setUpdateClick(!updateClick)
        }
    }

    return (
        <span>
            <button onClick={()=>{
                handleUpdate(_id)
            }}>Update</button>
            {updateClick ? <CustomerForm {...props} updateClick={updateClick}/> : <></>}
        </span>
        
    )
}

export default CustomerUpdate
