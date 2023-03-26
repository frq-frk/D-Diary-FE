import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { facebookLoginInitiate, googleLoginInitiate } from '../../redux/actions';
import { Grid, Button, Paper, Box, Stack, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailLoginForm from './EmailLoginForm';
import EmailSignupForm from './EmailSignupForm';
import ResetPasswordForm from './ResetPasswordForm';
import { toast } from 'react-toastify';
import { colors } from '../../theme/Colors';


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


        <Box
            sx={{
                height: '100%',
                width: '100%',
                background: 'transparent',
                padding: '5%'
            }}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
        >
            {isResetPassword ? <ResetPasswordForm /> : (isLogin ? <EmailLoginForm /> : <EmailSignupForm />)}

            {
                isResetPassword ? (<Typography
                    variant="body1"
                    component="span"
                    onClick={toggleIsPasswordReset}
                    style={{ marginTop: "10px", cursor: "pointer" }}
                >
                    Back
                </Typography>) : (isLogin ?
                    <>
                        <Typography
                            variant="body1"
                            component="span"
                            onClick={toggleIsPasswordReset}
                            style={{ marginTop: "10px", cursor: "pointer", color: colors.textPrimary }}
                        >
                            Forgot password?
                        </Typography>

                        <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px" }}
                        >
                            Not registered yet?{" "}
                            <span
                                style={{ color: colors.textPrimary, cursor: "pointer" }}
                                onClick={toggleForm}
                            >
                                Create an Account
                            </span>
                        </Typography>
                    </>
                    : <Typography
                        variant="body2"
                        component="span"
                        style={{ marginTop: "10px" }}
                    >
                        Already a User?{" "}
                        <span
                            style={{ color: colors.textPrimary , cursor: "pointer" }}
                            onClick={toggleForm}
                        >
                            Please login
                        </span>
                    </Typography>)
            }

            {!isResetPassword && (
                <Grid container spacing={1} mt={5}>
                    <Grid item xs={12} md={12} lg={6}>
                        <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithGoogle} color='textPrimary' ><GoogleIcon fontSize='small' /> Login using Google</Button>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <Button variant="outlined" disabled={loading ? true : false} onClick={loginWithFB} color='textPrimary' ><FacebookOutlinedIcon fontSize='small' /> Login using Facebook</Button>
                    </Grid>
                </Grid>)
            }
        </Box>
    )
}

export default LoginForm