import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import ReadableProfile from './ReadableProfile'
import EditableProfile from './EditableProfile'
import { useSelector } from 'react-redux'
import axios from 'axios';

function Profile() {

    const { token } = useSelector(state => state.user)
    const [data, setData] = useState([])

    console.log( "user id token"+  token);
    const fetchProfile = () => {
        axios.get("http://localhost:5000/v1/user/get-profile", 
        
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            setData(res.data)
        }).catch((e) =>  console.log(e))
    }
    useEffect(() => {
        fetchProfile();
    },[])

    return (
        <Grid item xs={12} sm={8} md={8}>
            <ReadableProfile props={data}/>
            <EditableProfile props={data}/>
        </Grid>
    )
}

export default Profile