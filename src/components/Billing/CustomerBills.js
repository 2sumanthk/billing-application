import React,{useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { startGetBills } from '../../redux/actions/billing/billsAction'
import CustomerBillsList from './CustomerBillsList'
import { Grid, Typography } from '@material-ui/core'


export default function CustomerBills(props){
    const {id} = props.match.params
    
    const dispatch  = useDispatch()
    const bills = useSelector((state)=>{
        return state.bills
    })
    useEffect(()=>{
        dispatch(startGetBills())
    }, [dispatch])

    const billList = bills.filter(ele=>ele.customer === id)
    
     return (
        <div> 
            <Grid>
                <Typography variant = "h4" align ="left">
                        Total Bills   - {billList.length}
                </Typography>
                
                </Grid>
                <Grid container spacing={2} style={{ maxHeight : '600px'}} >
                {billList.map(ele =>{
                    return (
                        <Grid item xs={6} key={ele._id}>
                            <CustomerBillsList {...ele}/>
                        </Grid> 
                    )
                })}
                </Grid>
        </div>
    )
}