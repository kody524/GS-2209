import React, {useState,useEffect} from 'react';
import NavBar from './NavBar';
import { getAllUsers } from '../allApiCalls';
import styles from './Admin.module.css'
import { Card, CardContent, Typography } from '@mui/material';
function Admin(){
const[users,setUsers]=useState([])
console.log(users)
useEffect(()=>{
getAllUsers(setUsers)
},[])
    return(<>
        <NavBar/>
        <div className={styles.container}>
            <h1>All Users</h1>
        {
            users.map(ele=>{
                return (
                    <Card sx={{ width: 500,borderColor: 'black',borderStyle: 'solid' }}>
                        <CardContent>
                            <Typography >
                                Username:  {ele.username}
                            </Typography>
                            <Typography>
                                FirstName:  {ele.firstname}
                            </Typography>
                            <Typography>
                                LastName:  {ele.lastname}
                            </Typography>
                            <Typography>
                                Email:  {ele.email}
                            </Typography>
                            <Typography>
                                Address:  {ele.street}
                            </Typography>
                            <Typography>
                                City:  {ele.city}
                            </Typography>
                            <Typography>
                                State:  {ele.state}
                            </Typography>
                            <Typography>
                                Phone:  {ele.phone}
                            </Typography>
                        </CardContent>
                    </Card>
         
                )
            })
        }
        </div>
        </>)
}
export default Admin;