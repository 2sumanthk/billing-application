import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addItem, resetItems , incrementQuantity, decrementQuantity, removeItem} from '../../redux/actions/lineitems/lineItemsActions'
import {startAddBill} from '../../redux/actions/billing/billsAction'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Autocomplete} from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

const useStyles = makeStyles((theme)=>({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const BillingForm = (props)=>{

  const classes = useStyles()
  const dispatch = useDispatch()
  const [date, setDate] = useState('')
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')

  const customers = useSelector((state) => {
    return state.customers_info;
  });

  const products = useSelector((state) => {
    return state.products_info;
  });

  const lineItems = useSelector((state)=>{
    return state.lineItems_info;
  })

 const handleDateChange = (e)=>{
  setDate(e.target.value)
 }

 const handleCustomerChange = (e, param)=>{
  if(param){
    setCustomer(param._id)
  }else{
    setCustomer('')
  }
 }

 const handleProductChange = (e, param)=>{
    if(param){
      setProduct(param._id )
      itemGenerator(param)
    }else{
      setProduct('')
    }
  }

const itemGenerator = (item)=>{
  let quantity = 1
  const itemObj = {
      '_Id' : new Date(),
      'productName' : item.name,
      'price' : item.price,
      'product' : item._id,
      'quantity' : quantity,
      'subTotal' : quantity * item.price
  }
  dispatch(addItem(itemObj))
}  

const handleDecrease = (id) => {
  dispatch(decrementQuantity(id))
}

const handleIncrease = (id) => {
  dispatch(incrementQuantity(id))
}

const handleRemove = (id) => {
  dispatch(removeItem(id))
}

const handleSubmit = (e) => {
  e.preventDefault()
  const formData = {
    date : date ,
    customer : customer,
    lineItems : lineItems
  }

  dispatch(startAddBill(formData))
  setDate('')
  setCustomer('')
  setProduct('')
  dispatch(resetItems())
  
}
const totalBill = () => {
  let total = 0
  lineItems.forEach((item) => {
    total += (item.price * item.quantity)
  })
  return total
}

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={4}>
              <TextField
                label="Date of Purchase"
                type='date-time local'
                value={date}
                onChange={handleDateChange}
                className={ classes.textField}
                InputLabelProps={{
                  shrink : true
                }}
              />
              <Autocomplete
                options={customers.map((cust)=>cust ? cust.name : "")}
                onChange={handleCustomerChange}
                className={ classes.textField}
                style={{width:"194px", marginTop: '20px'}}
                renderInput={(params) => (
                  <TextField {...params} label="Customer" variant="outlined" fullWidth />
                )}
              />
              <Autocomplete
                    options={products}
                    getOptionLabel={(product) => (product? product.name : "" )}
                    onChange={handleProductChange}
                    className={classes.textField}
                    style={{width:"194px", marginTop: '20px'}}
                    renderInput={(params) => (
                      <TextField {...params} label="product" variant="outlined" fullWidth />
                    )}  
              />
          </Grid>
              <Grid item xs={12} style={{marginTop: '20px'}}> 
                  <Button type="submit" size="small" variant="contained" color="primary"> add </Button>
              </Grid>
        </Grid>
      </form>
      <Grid item style={{overflowY : lineItems.length > 0 && 'scroll' , maxHeight : '400px'}}>
        {lineItems.map((item, i) => { 
          return( 
            <Card elevation={4} className={classes.root} key={i}>
              <CardActionArea>
                <CardContent>
                  {item.productName} - <b>₹{item.price}</b>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary"
                    onClick={() => {handleDecrease(item._Id)}}> <RemoveCircleSharpIcon /> 
                  </Button>
                  {item.quantity}
                  <Button size="small" color="primary"
                    onClick={() => {handleIncrease(item._Id)}}> <AddCircleSharpIcon />
                  </Button>
                  ₹{item.quantity * item.price}
                  <Button size="small" color="secondary"
                    onClick={() => {handleRemove(item._Id)}} > <CancelSharpIcon /> 
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card >
            
          )
        })}
        {lineItems.length > 0 ? `Total: ₹${totalBill()}` : '' }
      </Grid>
    </div>
  )
}

export default BillingForm


















































// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import { startListCustomers } from "../../redux/actions/customers/customersListAction";
// import { startListProduct } from "../../redux/actions/products/productListAction";

// const BillingForm = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [selectCust, setSelectCust] = useState("");
//   const [selectProd, setSelectProd] = useState("");
//   const [quantity, setQuantity] = useState(0);
//   const [check, checkQuantity] = useState(0);
//   const [lineitems, setLineItems] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     /* This useEffect gets called everytime once the browser gets refreshed, 
//             to make sure that customer and product dropdown gets filled once the page is loaded, 
//             otherwise the api call through dispatch is never made to before we fetch from store using useSelector*/

//     dispatch(startListCustomers());
//     dispatch(startListProduct());
//   }, []);

//   const customers = useSelector((state) => {
//     return state.customers_info;
//   });

//   const products = useSelector((state) => {
//     return state.products_info;
//   });

//   console.log("In Billing Form, listing customers", customers);
//   console.log("In Billing Form, listing products", products);

//   const handleCustomerChange = (e) => {
//     console.log(e.target.value);
//     const cust = customers.find((cust) => {
//       console.log("------->", cust);
//       return cust._id === e.target.value;
//     });
//     console.log("found customer in Bill form", cust._id);
//     const cust_id = cust._id;
//     setSelectCust(cust_id);
//   };

//   const handleProductChange = (e) => {
//     console.log(e.target.value);
//     const prod = products.find((prod) => {
//       return prod._id === e.target.value;
//     });
//     console.log("found Product in Bill form", prod._id);
//     const prod_id = prod._id;
//     setSelectProd(prod_id);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date: startDate,
//       customer: selectCust,
//       lineItems: lineitems,
//     };
//     console.log(formData);
//   };

//   const handleItemAdd = () => {
//     if (selectProd !== "" && quantity !== 0) {
//       lineitems.push({ selectProd, quantity });
//       console.log(lineitems);
//     }
//   };

//   const handleIncreaseQty = (index) => {
//     //e.stopPropagation();
//     // checkQuantity(index);
//     console.log(index, check);
//     setQuantity(quantity + 1);
//   };

//   // const increaseQuantity = (prodID)=>{
//   //     if(prodID==selectProd) setQuantity(quantity+1)
//   // }

//   // const decreaseQuantity = ()=>{
//   //     setQuantity(quantity-1)
//   // }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           dateFormat="MMMM d, yyyy"
//         />

//         <select onChange={handleCustomerChange}>
//           <option>Select Customer</option>
//           {customers.map((cust) => {
//             return (
//               <option key={cust._id} value={cust._id}>
//                 {cust.name}
//               </option>
//             );
//           })}
//         </select>
//         <div>
//           {products.map((prod, index) => {
//             return (
//               <li key={prod._id} value={prod._id}>
//                 {prod.name},
//                 <button
//                   onClick={() =>
//                     index ==  check ? () => handleIncreaseQty(index) : ""
//                   }
//                 >
//                   +
//                 </button>
//                 {quantity}
//                 <button>-</button>
//               </li>
//             );
//           })}
//         </div>
//         <input type="button" value="Add items" onClick={handleItemAdd} />
//         <input type="submit" value="Generate Bill"></input>
//       </form>
//       <Link to="/home">Back to Home</Link>

//       <div>
//         <h2>Mini Cart</h2>
//         {lineitems.map((item) => {
//           return (
//             <li key={item.selectProd}>
//               Item - {item.selectProd} , Quantity -
//               <button onClick={() => {}}>+</button>
//               {item.quantity}
//               <button>-</button> <button>Delete</button>
//             </li>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default BillingForm;
