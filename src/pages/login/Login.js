import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Grid, Box } from '@mui/material'
import LoginForm from '../../components/forms/LoginForm';
import ImageFiller from '../../components/fillers/ImageFiller';
import { colors } from '../../theme/Colors';

function Login() {

    const boxstyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        height: "70%",
        bgcolor: "transparent",
        boxShadow: 24,
    };

    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {

        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate]);

    return (
        <Box sx={boxstyle}>
            <Grid container>
                <Grid item xs={12} sm={12} lg={6}>
                    <Box
                        style={{
                            // backgroundImage: `url(${bg})`,
                            backgroundSize: "cover",
                            marginTop: "40px",
                            marginLeft: "15px",
                            marginRight: "15px",
                            height: "63vh",
                            color: "#f5f5f5",
                        }}
                    >
                        <ImageFiller image="/images/diaryWithoutBG.png"/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Box
                        style={{
                            backgroundSize: "cover",
                            height: "70vh",
                            minHeight: "500px",
                            backgroundColor: "#6495ED",
                        }}
                    >

                        <LoginForm />
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Login