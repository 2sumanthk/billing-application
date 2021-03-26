import React,{useState} from 'react'
import validator from 'validator'
import {startGetCustomer} from '../../redux/actions/customerInfoAction'
import {startUpdateCustomer} from '../../redux/actions/customerUpdateAction'
import {useDispatch} from 'react-redux'


const CustomerForm =(props)=>{
    const {_id, email : custEmail, name : custName, mobile: custMobile, updateClick} = props
    const [email, setEmail] = useState(custEmail ? custEmail: '')
    const [name, setCustname] = useState(custName ? custName : '')
    const [mobile, setMobile] = useState(custMobile ? custMobile : '')
    const [formErrors, setFormErrors] = useState({})
    const [displayform, setDisplayForm] = useState(true)

    const dispatch = useDispatch()

    const errors = {}
    
    const handleChange = (e)=>{
        const value = e.target.name

        if(value==='email'){
            setEmail(e.target.value)
        }
        if(value==='name'){
            setCustname(e.target.value)
        }
        if(value==='mobile'){
            setMobile(e.target.value)
        }
    }

    const runValidations = ()=>{
        if(name.trim().length===0){
            errors.name = `Customer name is mandatory`
        }
        if(mobile.trim().length===0){
            errors.mobile = `Mobile number mandatory`
        }else if(mobile.length>10){
            errors.mobile = `Mobile number can have only 10 digits`
        }
        if(!validator.isEmail(email)){
            errors.email = 'Enter a valid Email'
        }
    }

    const handleSubmit = (e)=>{

        // for updating customers

        if(updateClick){
            setDisplayForm(!displayform)
            e.preventDefault()
            runValidations()
            if(Object.keys(errors).length===0){
                setFormErrors({})
                const updateCustomer = {
                    name : name,
                    mobile : mobile,
                    email : email
             }
            console.log('formData', updateCustomer)
            setCustname('')
            setEmail('')
            setMobile('')
            dispatch(startUpdateCustomer(updateCustomer,_id))
        }else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }

    }else {
        // for new customers
        setDisplayForm(!displayform)
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const createCustomer = {
                name : name,
                mobile : mobile,
                email : email
            }
            console.log('formData', createCustomer)
            setCustname('')
            setEmail('')
            setMobile('')
            dispatch(startGetCustomer(createCustomer))

        }else{
            setFormErrors(errors)
            console.log('formErrors', errors)
        }
    }
    }

    const handleformcancel = ()=>{
        setDisplayForm(!displayform)
    }

    return (
        <div>
            {
                displayform ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' value = {name} name='name' onChange={handleChange} placeholder='Enter Customer Name' autoFocus/><br/>
                        {
                            formErrors.name && <div><span style={{color:'red'}}>{formErrors.name}</span><br/></div>
                        }
                        <input type='text' value = {mobile} name='mobile' onChange={handleChange} placeholder='10 digit Mobile Number' /><br/>
                        {
                            formErrors.mobile && <div><span style={{color:'red'}}>{formErrors.mobile}</span><br/></div>
                        }
                        <input type='text' value = {email} name='email' onChange={handleChange} placeholder='Enter Email' /><br/>
                        {
                            formErrors.email && <div><span style={{color:'red'}}>{formErrors.email}</span><br/></div>
                        }
                        <input type='submit' value = {updateClick ? 'Save Updated info' : 'Save Customer'}/> 
                    </form> 
                    <button onClick={handleformcancel}>Cancel</button>
                </div> : <></>
            }
        </div>
    )
}

export default CustomerForm