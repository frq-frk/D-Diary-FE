import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControl, InputLabel, Input, IconButton, Box, Button, FormHelperText } from '@mui/material'
import { emailLoginInitiate } from '../../redux/actions';
import { emailValidator, passwordValidator } from '../../utils/AuthUtils';

function EmailLoginForm() {

    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);

    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [mailError, setMailError] = React.useState(false);
    const [passwordHelperText, setPasswordHelperText] = React.useState("");

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        console.log("mail :" + mail);
        console.log("password :" + password);
        // console.log(passwordValidator(password))
        if(!emailValidator(mail)){
            setMailError(true)
            return
        }
        if(!passwordValidator(password)){
            setMailError(false)
            setPasswordHelperText("password must contain eight characters with atleast one uppercase, a number and special character")
            return
        }
        const obj = {
            email: mail,
            passwd: password
        }

        dispatch(emailLoginInitiate(obj))
        // setMail("");
        // setPassword("");
    }

    return (
        <>
            <h1>Login</h1>
            <Box m={1} px={8}>
                <TextField
                    required
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Mail"
                    value={mail}
                    onChange={handleMailChange}
                    helperText="Please enter a valid mail"
                    error = {mailError}
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
                <FormControl fullWidth variant="standard" size='small'>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        required
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        aria-describedby="pwd-helper-text"
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
                    <FormHelperText id="pwd-helper-text" error>{passwordHelperText}</FormHelperText>
                </FormControl>
            </Box>

            <Box m={2} px={7} mt={3}>
                <Button fullWidth variant="contained" onClick={handleLogin} disabled={loading ? true : false}>Submit</Button>
            </Box>
        </>
    )
}

export default EmailLoginForm