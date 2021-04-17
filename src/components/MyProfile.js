import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import DraftsIcon from '@material-ui/icons/Drafts';





const MyProfile = (props)=>{

    const [userInfo, setUserInfo] = useState([])
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    useEffect(()=>{

        const loggedInUserToken = localStorage.getItem('token')
        console.log("Received token at MyProfile comp", loggedInUserToken)

        axios.get('https://dct-billing-app.herokuapp.com/api/users/account',{
            headers : {
                Authorization : `Bearer ${loggedInUserToken}`
            }
        })
        .then((response)=>{
            const result = response.data
            setUserInfo(result)
            console.log('HomePage',result)
        })
        .catch((err)=>{
            const msg = err.message
            alert("error at home comp axios.get", msg)
        })
    },[])

    console.log(userInfo)

    return (
        <Grid
        container
        justify="center"
        style={{background : "#add8e6"   }}
        >
            <div
                style={{ display : "flex", flexDirection: 'column', padding:250 , background : "Yellow"
                }}
                   
            >
            <Typography variant="h4">
                    My Profile Details
            </Typography>
            <List dense={dense} >
                <ListItem>
                <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userInfo.username}`}
                  />
                </ListItem>
            </List>
            <List dense={dense}>
                <ListItem>
                <ListItemAvatar>
                    <Avatar>
                    <DraftsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userInfo.email}`}
                  />
                </ListItem>
            </List>
            <List dense={dense}>
                <ListItem>
                <ListItemAvatar>
                    <Avatar>
                    <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userInfo.businessName}`}
                  />
                </ListItem>
            </List>
            <Typography variant="h6" component="h1"><Link to='/home'>Back to Home</Link></Typography>
          </div>
            {/* <table border={1}>
                <thead>
                    <tr>
                        <td>User Name </td>
                        <td>Email </td>
                        <td>Business Name</td>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{userInfo.username}</td>
                            <td>{userInfo.email}</td>
                            <td>{userInfo.businessName}</td>
                        </tr>
                </tbody>
            </table> */}
            {/* <Link to='/home'>Back to Home</Link> */}
        
        </Grid>
    )
}

export default MyProfile