import React, {useState, useEffect} from 'react'
import validator from 'validator'
import clsx from 'clsx'
import {Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setRegUsers} from '../redux/actions/usersRegisterAction'
import {startGetRegUsers} from '../redux/actions/usersRegisterAction'
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import configureStore from '../redux/store/configureStore'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: { margin: theme.spacing(5) },
    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
  }));


const UserRegister = (props)=>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [business, setBusiness] = useState('')
    const [address, setaddress] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [formErrors, setFormErrors] = useState({})

    const dispatch = useDispatch()
    
    const registeredCustSuccess = useSelector((state)=>{
        return state.registered_users
    })

    console.log("registeredCustSuccess", registeredCustSuccess)
    const errors = {}

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                    <Typography variant="h1" component="h2">
                            Billing App
                    </Typography>  
            <form onSubmit={handleSubmit}>
            <TextField 
                required 
                id="standard-basic" 
                label="Username" 
                name='username' 
                value = {username} 
                onChange={handleChange} 
                error = {formErrors.username}
                helperText ={formErrors.username}
                autoFocus/><br/>
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
            <TextField 
                id="standard-basic" 
                label="Business" 
                name='business' 
                value = {business} 
                onChange={handleChange} 
                /><br/>
            {/* <input type='text' value = {business}  name='business' onChange={handleChange} placeholder='Business name'/><br/> */}
            <TextField 
                id="standard-basic" 
                label="Address" 
                name='address' 
                value = {address} 
                onChange={handleChange} 
                />
            {/* <textarea type='text' value= {address} name='address' onChange={handleChange} placeholder='Address'></textarea><br/> */}
            <br/>
            <br/>
            <Button variant="contained" color="primary" type='submit'>Register</Button>
        </form>
        <br/>
                <Typography variant="h6" component="h1">Already a Registered User ? <Link to='/users/login'>Login here</Link></Typography>                           
            </Container>
            
        </>
    )
}

export default UserRegister