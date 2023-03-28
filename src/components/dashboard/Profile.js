import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import ReadableProfile from './ReadableProfile'
import EditableProfile from './EditableProfile'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { updateUserProfile } from '../../redux/actions'

function Profile() {

    const { token, userProfile } = useSelector(state => state.user)
    const [data, setData] = useState([])

    const dispatch = useDispatch()

    const fetchProfile = () => {

        if (userProfile && !userProfile.message) {
            // console.log(userProfile)
            setData(userProfile)
        } else {

            axios.get("http://localhost:5000/v1/user/get-profile",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    console.log(res)
                    setData(res.data)
                    dispatch(updateUserProfile(res.data))
                }).catch((e) => console.log(e))
        }
    }
    useEffect(() => {
        fetchProfile();
    }, [token])

    return (
        <Grid item xs={12} sm={8} md={5}>
            <ReadableProfile props={data} />
            <EditableProfile props={data} />
        </Grid>
    )
}

export default Profile