import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startGetBills } from '../../redux/actions/billing/billsAction'
import BillingForm from './BillingForm'
import BillingList from './BillingList'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}))

const BillContainer=(props) =>{
    const dispatch = useDispatch()
    const classes = useStyles()
    useEffect(() =>{
        dispatch(startGetBills())
    },[dispatch])
    return (
        <div>
           <Grid container spacing={2}>
         <Grid item xs={8}>
            <Paper className={classes.paper}><BillingList /></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}><BillingForm /></Paper>
          </Grid>
          
        </Grid>
        </div>
    )
}
export default BillContainer