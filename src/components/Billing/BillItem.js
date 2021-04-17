import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {startRemoveBill} from '../../redux/actions/billing/billsAction'
import {totalBill} from './totalBillfunction'
import swal from 'sweetalert'
import DeleteIcon from '@material-ui/icons/Delete'
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

const BillItem = (props)=>{
    const dispatch = useDispatch()
    const {_id, date, customer, lineItems } = props

    const customerDetials = useSelector((state) =>{
        return state.customers_info.find(cus => cus._id === customer)
    })
   
    const productsName = useSelector((state) => {
        const arr = []
        for(const item of lineItems){
            const res = state.products_info.find(prod => prod._id === item.product)
            arr.push({...res, ...item})
        }
        return arr
    })
    
    
    const handleRemove =() =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        
        .then((conformation) => {
            if (conformation) {
                dispatch(startRemoveBill(_id))
            } 
        })
    }
    return(
        <div >
            <Card elevation={4}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                           <b>Name :</b> {customerDetials && customerDetials.name}  
                           
                        </Typography>
                        <Typography >
                            <b>Date :</b> {date} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Phn.No : +91 {customerDetials && customerDetials.mobile}
                        </Typography>
                        
                        <Table border="2" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price(₹)</TableCell>
                                    <TableCell>Total price(₹)</TableCell>
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {productsName.map((product,i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.subTotal}</TableCell>   
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                            
                         
                          <Typography variant="body2" align="right" color="textSecondary" component="p">
                            <b>Total: ₹{totalBill(lineItems)}</b>
                          </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button>Show Bill</Button>
                    <Button size="small" color="secondary" onClick={handleRemove}>
                        <DeleteIcon fontSize="small"/>
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
export default BillItem