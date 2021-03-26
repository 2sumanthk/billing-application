import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const Home = (props)=>{

    const [userInfo, setUserInfo] = useState([])

    useEffect(()=>{

        const loggedInUserInfo = localStorage.getItem('token')
        console.log("Received token at Home comp", loggedInUserInfo)

        axios.get('https://dct-billing-app.herokuapp.com/api/users/account',{
            headers : {
                Authorization : `Bearer ${loggedInUserInfo}`
            }
        })
        .then((response)=>{
            const result = response.data
            setUserInfo(result)
            console.log('HomePage',result)
        })
        .catch((err)=>{
            const msg = err.message
            alert("error at home comp axios.get", msg)
        })
    },[])


    return (
        <div>
            <h1>Welcome to Billing Application Home Page</h1>
            <Link to='/Customers'>Customer DashBoard</Link> -
            <Link to='/products'>Product DashBoard</Link> - 
            <Link to='/MyProfile'>My Profile</Link> - 
            <Link to='users/login'onClick={()=>{
                localStorage.removeItem('token')
                alert('User Successfully Logged Out !')
                props.history.push('/login')
            }}>Logout</Link>
            <h4>Click the above links to explore more...</h4>
            
        </div>
    )
}

export default Home