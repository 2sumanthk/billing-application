import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history' 
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store/configureStore';

export const history = createBrowserHistory() // Making brouser history available across the route

const store = configureStore()

console.log("State", store.getState() )

store.subscribe(()=>{
  console.log("Updated State", store.getState() )
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}> 
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
