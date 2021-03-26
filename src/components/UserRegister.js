import React, {useState, useEffect} from 'react'
import validator from 'validator'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Link, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setRegUsers} from '../redux/actions/usersRegisterAction'
import {startGetRegUsers} from '../redux/actions/usersRegisterAction'

const eye = <FontAwesomeIcon icon={faEye} />;

const UserRegister = (props)=>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [business, setBusiness] = useState('')
    const [address, setaddress] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [formErrors, setFormErrors] = useState({})

    const dispatch = useDispatch()

    const errors = {}

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };
    
    const handleChange = (e)=>{
        const value = e.target.name

        if(value==='username'){
            setUsername(e.target.value)
        }
        if( value==='email'){
            setEmail(e.target.value)
        }
        if(value==='password'){
            setPassword(e.target.value)
        }
        if(value==='business'){
            setBusiness(e.target.value)
        }
        if(value==='address'){
            setaddress(e.target.value)
        }

    }

    const runValidations = ()=>{
        if(username.trim().length===0){
            errors.username = `username can't be blank`
        }
        if(email.trim().length===0){
            errors.email = `Email cannot be empty`
        }else if(!validator.isEmail(email)){
            errors.email = `Email incorrect`
        }
        if(password.trim().length===0){
            errors.password = `password cannot be blank`
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const registredUsers = {
                username : username,
                email : email,
                password : password,
                businessName : business,
                address : address,
            }
            console.log('formData', registredUsers)

            setUsername('') // to empty the user filed after the form submit
            setPassword('')
            setEmail('')
            setaddress('')
            setaddress('')
            dispatch(startGetRegUsers(registredUsers))
        }else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }
    }

    return (
        <div>
         <h1>User Registration</h1>   
        <form onSubmit={handleSubmit}>
            <input type='text' value = {username} name='username' onChange={handleChange} placeholder='Username' autoFocus/><br/>
            {
                formErrors.username && <div><span style={{color:'red'}}>{formErrors.username}</span><br/></div>
            }
            <input type='text' value = {email} name='email' onChange={handleChange} placeholder='Email'/><br/>
            {
                formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
            }
            <div>
                <input type={passwordShown ? "text" : "password"} value = {password} name='password' onChange={handleChange} placeholder='Password' />
                <i onClick={togglePasswordVisiblity}>{eye}</i>
            </div>
            {
                formErrors.password && <div><span style={{color:'red'}}>{formErrors.password}</span><br/></div>
            }
            <input type='text' value = {business}  name='business' onChange={handleChange} placeholder='Business name'/><br/>
            <textarea type='text' value= {address} name='address' onChange={handleChange} placeholder='Address'></textarea><br/>
            <input type='submit' value = 'Register'/>
        </form>
        <h4>Already a Registered User ? <Link to='/users/login'>Login here</Link></h4> 
        
        </div>
    )
}

export default UserRegister