import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Grid } from '@mui/material'
import ImageFiller from '../../components/fillers/ImageFiller';
import NewPasswordForm from '../../components/forms/NewPasswordForm';

function NewPasswordPage() {

    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(currentUser)
        // console.log(token)

        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate]);

    return (
        <Grid container spacing={2} direction={'row'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <NewPasswordForm />
            <ImageFiller image="/images/diaryWithoutBG.png" />
        </Grid>
    )
}

export default NewPasswordPage