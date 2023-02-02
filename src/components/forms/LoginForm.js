import React from 'react'
import { useDispatch } from 'react-redux'
import { loginInitiate } from '../../redux/actions';
import { Grid, Button, Paper, Box, TextField, FormControl, InputLabel, Input, IconButton } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


function LoginForm() {

    const dispatch = useDispatch();

    const loginWithGoogle = () => {
        dispatch(loginInitiate());
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                        <Button fullWidth variant="contained">Submit</Button>
                    </Box>

                    <Grid container spacing={1} mt={5}>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" onClick={loginWithGoogle} color='text' ><GoogleIcon fontSize='small' /> Login using Google</Button>
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <Button variant="outlined" color='text' ><FacebookOutlinedIcon fontSize='small' /> Login using Facebook</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
        </Grid>
    )
}

export default LoginForm