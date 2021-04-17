import axios from "axios"
import swal from "sweetalert"

export const startGetBills = ()=>{
    return((dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills',{
            headers :{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.message)
            }else{
                dispatch(setBills(result))
            }
        })
        .catch((error)=>{
            alert(error.message)
        })
    })
}

export const setBills = (data)=>{
    return {
        type : "GET_BILLS",
        payload : data
    }
}

export const startAddBill = (bill) => {
    return (dispatch) => {
        axios.post("http://dct-billing-app.herokuapp.com/api/bills", bill , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            //console.log('added bill',result)
            if(result.hasOwnProperty("errors")){
                swal({title : result.message ,icon : 'error'})
            }else {
                dispatch(addBill(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const addBill = (data) => {
    return {
        type : 'ADD_BILL',
        payload : data
    }
}

export const startRemoveBill = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(remove(result))
            swal("Bill has been deleted!", {
                icon: "success",
            })
                   
        })
        .catch((err) => {
           swal(err.message)
        })
    }
}

export const remove = (data) => {
    return {
        type : 'REMOVE',
        payload : data
    }
}

