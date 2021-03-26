import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'




const MyProfile = (props)=>{

    const [userInfo, setUserInfo] = useState([])

    useEffect(()=>{

        const loggedInUserToken = localStorage.getItem('token')
        console.log("Received token at MyProfile comp", loggedInUserToken)

        axios.get('https://dct-billing-app.herokuapp.com/api/users/account',{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
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

    console.log(userInfo)

    return (
        <div>
            <h1>My Profile Details</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <td>User Name </td>
                        <td>Email </td>
                        <td>Business Name</td>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{userInfo.username}</td>
                            <td>{userInfo.email}</td>
                            <td>{userInfo.businessName}</td>
                        </tr>
                </tbody>
            </table>

            <Link to='/home'>Back to Home</Link>
        </div>
    )
}

export default MyProfile