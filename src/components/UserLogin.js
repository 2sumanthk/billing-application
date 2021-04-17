import React,{useState} from 'react'
import validator from 'validator'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from 'react-redux'
import { startGetloggedInUser } from '../redux/actions/loggedInUserAction';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';


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

    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Container maxWidth='sm' style={{ backgroundColor: '#cfe8fc', height: '40vh' }}>
            <Typography variant="h3" component="h2">
                    Billing Application Login
            </Typography>  
            <form onSubmit={handleSubmit} >
            <TextField 
                required 
                id="standard-basic" 
                label="Email" 
                name='email' 
                value = {email} 
                onChange={handleChange} 
                error = {formErrors.email}
                helperText ={formErrors.email}
                /><br/>
                {
                formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
                }
                {/* <input type='text' value = {email} name='email' onChange={handleChange} placeholder='Enter Email' autoFocus/><br/>
                {
                    formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
                } */}
                <FormControl >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        required
                        id="standard-adornment-password"
                        type={passwordShown ? 'text' : 'password'}
                        value={password}
                        name='password' 
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisiblity}
                                onMouseDown={handleMouseDownPassword}
                             >
                            {passwordShown ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                />
            </FormControl><br/>
                {/* <div>
                    <input type={passwordShown ? "text" : "password"} value = {password} name='password' onChange={handleChange} placeholder='Password' />
                    <i onClick={togglePasswordVisiblity}>{eye}</i>
                </div>
                {
                    formErrors.password && <div><span style={{color:'red'}}>{formErrors.password}</span><br/></div>
                } */}
                <br/>
                <br/>
                <Button variant="contained" color="primary" type='submit'>Login</Button> 
            </form>
            <br/>
            <Typography variant="h6" component="h1">New User ? <Link to='/users/register'>Register here</Link></Typography>
        </Container>
    )
}

export default UserLogin