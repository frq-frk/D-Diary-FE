import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import DiaryEntryForm from '../../components/forms/DiaryEntryForm';

function TodayEntry() {

    const { currentUser, isVerified } = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }else if(isVerified != null && !isVerified){
            navigate('/verifyemail')
        }
    }, [currentUser, navigate, isVerified])

    return (
        <Box sx={{ m: 4 }}>
            <h4>Today's Diary Entry</h4>
            <Grid container>
                <Grid item xs={12} sm={12} lg={2}>
                    <h2>Settings</h2>
                </Grid>
                <Grid item xs={12} sm={12} lg={10}>
                    <DiaryEntryForm />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TodayEntry