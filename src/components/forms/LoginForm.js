import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { facebookLoginInitiate, googleLoginInitiate } from '../../redux/actions';
import { Grid, Button, Paper, Box, Snackbar, Alert } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailLoginForm from './EmailLoginForm';
import EmailSignupForm from './EmailSignupForm';
import ResetPasswordForm from './ResetPasswordForm';
import { toast } from 'react-toastify';


function LoginForm() {

    const { loading, error, currentUser } = useSelector(state => state.user)

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isResetPassword, setIsResetPassword] = React.useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        else if (!isResetPassword && error) {
            toast.error("Error while Logging In!", {
                position: 'bottom-left',
                toastId: 1
            })
        }
    }, [currentUser, error, navigate])


    const dispatch = useDispatch();

    const loginWithGoogle = () => {
        dispatch(googleLoginInitiate());
    }

    const loginWithFB = () => {
        dispatch(facebookLoginInitiate());
    }

    const toggleForm = () => {
        setIsLogin((prevValue) => {
            return !prevValue;
        })
    }

    const toggleIsPasswordReset = () => {
        setIsResetPassword((prevValue) => {
            return !prevValue;
        })
    }

    return (
        <Grid item xs={12} sm={4} md={4} my={5} mx={1}>
            <Paper elevation={3}>
                <Box
                    sx={{
                        height: '100%',
                        backgroundColor: 'decoratory.main',
                        opacity: 0.9,
                        padding: '5%'
                    }}
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                >
                    {isResetPassword ? <ResetPasswordForm /> : (isLogin ? <EmailLoginForm /> : <EmailSignupForm />)}

                    {isResetPassword ? (<Button onClick={toggleIsPasswordReset}>Go to login page</Button>) : (isLogin ?
                        <>
                            <Button onClick={toggleForm}>Don't have an account? </Button>
                            <Button onClick={toggleIsPasswordReset}>Forgot password? </Button>
                        </>
                        : <Button onClick={toggleForm}>Already a user? </Button>)}

                    {!isResetPassword && (
                        <Grid container spacing={1} mt={5}>
                            <Grid item xs={12} md={12} lg={6}>
                                <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithGoogle} color='text' ><GoogleIcon fontSize='small' /> Login using Google</Button>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                                <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithFB} color='text' ><FacebookOutlinedIcon fontSize='small' /> Login using Facebook</Button>
                            </Grid>
                        </Grid>)
                    }

                </Box>
            </Paper>
        </Grid>
    )
}

export default LoginForm