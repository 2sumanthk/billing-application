import React,{useState} from 'react'
import validator from 'validator'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from 'react-redux'
import { startGetloggedInUser } from '../redux/actions/loggedInUserAction';

const eye = <FontAwesomeIcon icon={faEye} />;
const UserLogin = (props)=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [passwordShown, setPasswordShown] = useState(false);

    const dispatch = useDispatch()

    const errors = {}

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };
    
    const handleChange = (e)=>{
        const value = e.target.name

        if(value==='email'){
            setEmail(e.target.value)
        }
        if(value==='password'){
            setPassword(e.target.value)
        }
    }

    const runValidations = ()=>{
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
            const loggedInUsers = {
                email : email,
                password : password,
            }
            console.log('formData', loggedInUsers)
            setPassword('')
            setEmail('')
            dispatch(startGetloggedInUser(loggedInUsers))

        }else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }
    }

    return (
        <div>
            <h1>Billing Application Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value = {email} name='email' onChange={handleChange} placeholder='Enter Email' autoFocus/><br/>
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
                <input type='submit' value = 'Login'/> <h4>New User ? <Link to='/users/register'>Register here</Link></h4> 
            </form>
        </div>
    )
}

export default UserLogin