import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { facebookLoginInitiate, googleLoginInitiate } from '../../redux/actions';
import { Grid, Button, Paper, Box, TextField, FormControl, InputLabel, Input, IconButton, Snackbar, Alert } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


function LoginForm() {

    const { loading, error, currentUser } = useSelector(state => state.user)

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(currentUser){
            navigate('/')
        }
        else if(error){
            setOpen(true)
        }
    })


    const dispatch = useDispatch();

    const loginWithGoogle = () => {
        dispatch(googleLoginInitiate());
    }

    const loginWithFB = () => {
        dispatch(facebookLoginInitiate());
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                    <h1>Login</h1>
                    <Box m={1} px={8}>
                        <TextField
                            fullWidth
                            id="input-with-icon-textfield"
                            label="Mail"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            size='small'
                        />
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box m={2} px={7} mt={3}>
                        <Button fullWidth variant="contained" disabled = {loading ? true : false}>Submit</Button>
                    </Box>

                    <Grid container spacing={1} mt={5}>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" disabled = {loading ? true : false} onClick={loginWithGoogle} color='text' ><GoogleIcon fontSize='small' /> Login using Google</Button>
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" disabled = {loading ? true : false} onClick={loginWithFB} color='text' ><FacebookOutlinedIcon fontSize='small' /> Login using Facebook</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="error">Error while Logging In!</Alert></Snackbar>
        </Grid>
    )
}

export default LoginForm