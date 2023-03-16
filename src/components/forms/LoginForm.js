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


function LoginForm() {

    const { loading, error, currentUser } = useSelector(state => state.user)

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isResetPassword, setIsResetPassword] = React.useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        else if (error) {
            setOpen(true)
        }
    }, [currentUser, error, navigate])


    const dispatch = useDispatch();

    const loginWithGoogle = () => {
        dispatch(googleLoginInitiate());
    }

    const loginWithFB = () => {
        dispatch(facebookLoginInitiate());
    }



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                    <Grid container spacing={1} mt={5}>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithGoogle} color='text' ><GoogleIcon fontSize='small' /> Login using Google</Button>
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithFB} color='text' ><FacebookOutlinedIcon fontSize='small' /> Login using Facebook</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="error">Error while Logging In!</Alert></Snackbar>
        </Grid>
    )
}

export default LoginForm