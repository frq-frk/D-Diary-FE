import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Paper, Box, FormControl, InputLabel, Input, IconButton, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { auth } from '../../firebase'; 
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { loadingEnd, loadingInitiate } from '../../redux/actions';


function NewPasswordForm() {

    const { loading } = useSelector(state => state.user)

    const [email, setEmail] = useState(null)
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [e, setE] = useState(null)


    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const query = new URLSearchParams(useLocation().search);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {

        dispatch(loadingInitiate())
        console.log("password :" + password);
        console.log("confirm pwd :" + confirmPassword);

        confirmPasswordReset(auth, query.get("oobCode"), password).then((res) => {
            console.log('password updated')
            dispatch(loadingEnd())
            navigate('/');
        }).catch((e) => {
            console.log(e)
            setE(e);
            dispatch(loadingEnd())
        })
    }

    useEffect(() => {
        console.log(query.get("oobCode"))
        verifyPasswordResetCode(auth, query.get("oobCode")).then((email) => {
            console.log("reset code verify success");
            setEmail(email); 
        }).catch((e) => {
            console.log(e);
            setE(e)
        })
    }, [])

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

                    <h1>Set Password</h1>

                    <TextField
                        fullWidth
                        id="input-with-icon-textfield"
                        value={email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        size='small'
                        disabled={true}
                    />

                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
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
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Box m={2} px={7} mt={3}>
                        <Button fullWidth variant="contained" onClick={handleSubmit} disabled={loading ? true : false}>Submit</Button>
                    </Box>

                </Box>
            </Paper>
        </Grid>
    )
}

export default NewPasswordForm