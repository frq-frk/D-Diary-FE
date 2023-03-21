import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Grid } from '@mui/material'
import LoginForm from '../../components/forms/LoginForm';
import ImageFiller from '../../components/fillers/ImageFiller';

function Login() {

    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {

        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate]);    

    return (
        <Grid container spacing={2} direction={'row'} sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            <LoginForm/>
            <ImageFiller image="/images/diaryWithoutBG.png"/>
        </Grid>
    )
}

export default Login