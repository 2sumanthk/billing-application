import axios from 'axios'
import {history} from '../../index'

export const startGetloggedInUser = (loggedInUsers)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/login',loggedInUsers)
        .then((response)=>{
            const result = response.data
            console.log(result)
            if(Object.keys(result).includes('errors')){
                alert(result.errors)
            }else{
                alert("User Successfully Logged In")
                dispatch(setLoggedInUsers(loggedInUsers))
                localStorage.setItem('token',result.token)
                history.push('/home') // navigate to home after successful login,
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const setLoggedInUsers = (LoggedInUserr)=>{
    return {
        type : 'SET_LOGGED_IN_USER',
        payload : LoggedInUserr
    }
}