import React from 'react'
import {Route, Link} from 'react-router-dom'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import CustomersList from './components/Customers/CustomersList'
import ProductsList from './components/products/ProductsList'


function App() {
  return (
   <div>
        <Route path='/' component={UserRegister} exact={true}/>
        <Route path='/users/register' component={UserRegister}/>
        <Route path='/users/login' component={UserLogin}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/MyProfile' component={MyProfile}></Route>
        <Route path='/Customers' component={CustomersList}></Route>
        <Route path='/products' component={ProductsList}></Route>
   </div>
  );
}

export default App;
