import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import configureStore from '../redux/store/configureStore'
import swal from 'sweetalert'
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';


const Home = (props)=>{

    const customers = useSelector((state)=>{
        // const store = configureStore()
        // console.log("store state",store.getState())
        // console.log(state)
        return state.customers_info
    })

    const products = useSelector((state)=>{
        return state.products_info
    })

    console.log("Customers-->",customers)
    console.log("Products-->",products)

    return (
        <div>
        <AppBar>
            <Toolbar style={{display: 'flex', justifyContent : 'space-between'}}>
                <div >
                    <h1>Welcome to Billing Application</h1>
                </div>
                    <Button variant='contained' component={Link} to = {`/Customers`} startIcon={<PeopleOutlinedIcon/>}>
                        Customers
                    </Button>
                    <Button variant='contained' component={Link} to = {`/products`} startIcon={<ViewStreamOutlinedIcon/>}>
                        Products
                    </Button>
                    <Button variant='contained' component={Link} to = {`/Bills`} startIcon={<ReceiptOutlinedIcon/>}>
                        Billing
                    </Button>
                    <Button variant='contained' component={Link} to = {`/MyProfile`} startIcon={<FaceOutlinedIcon/>}>
                        Its Me
                    </Button>
                    <Button variant='contained' component={Link} to = {`users/login`} 
                        onClick={()=>{
                            localStorage.removeItem('token')
                            swal({title : 'User Logged Out',icon : 'success'})
                            props.history.push('/login')
                        }} 
                        startIcon={<ExitToAppOutlinedIcon/>}>
                        Logout
                    </Button>
            </Toolbar>
        </AppBar>
        <div style={{backgroundColor : "yellow"}}><h4>Customers - {customers.length} Products - {products.length} Bills Generated - {0}</h4></div>
        </div>
        
    )
}

export default Home