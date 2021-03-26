import axios from 'axios'
import {history} from '../../index'

export const startGetRegUsers = (regUsers)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/register',regUsers)
        .then((response)=>{
            console.log(response)
            const users = response.data
            dispatch(setRegUsers(users))
            alert("User Successfully Created")
            history.push('/users/login')
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const setRegUsers = (users)=>{
    return {
        type : 'SET_REG_USERS',
        payload : users
    }
}

