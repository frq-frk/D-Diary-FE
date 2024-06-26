import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControl, InputLabel, Input, IconButton, Box, Button, FormHelperText } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { emailSignupInitiate } from '../../redux/actions';
import { emailValidator, passwordValidator } from '../../utils/AuthUtils';

function EmailSignupForm() {

    const { loading } = useSelector(state => state.user)

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const [mailError, setMailError] = React.useState(false);
    const [passwordHelperText, setPasswordHelperText] = React.useState("");
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = React.useState("");
    const [nameError, setNameError] = React.useState(false)

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        const temp = event.target.value
        if(temp.length != password.length){
            setMailError(false)
            setPasswordHelperText("")
            setConfirmPasswordErrorText("Confirm password should match with password field")
        }else {
            setConfirmPasswordErrorText("")
        }
        setConfirmPassword(temp);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSignup = () => {
        console.log("mail :" + mail);
        console.log("password :" + password);
        console.log("confirm pwd :" + confirmPassword);
        console.log("name :" + name);

        if(!emailValidator(mail)){
            setMailError(true)
            return
        }
        if(!passwordValidator(password)){
            setMailError(false)
            setPasswordHelperText("password must contain eight characters with atleast one uppercase, a number and special character")
            return
        }

        if(name === ""){
            setNameError(true)
            return
        }

        const obj = {
            email: mail,
            passwd: password,
            dName: name
        }
        dispatch(emailSignupInitiate(obj))
        // setMail("");
        // setPassword("");
        // setConfirmPassword("");
        // setName("");
    }

    return (
        <>
            <h1>Signup</h1>
            <Box mx={1} px={8}>
                <TextField
                    required
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Mail"
                    value={mail}
                    onChange={handleMailChange}
                    helperText="Please enter a valid mail"
                    error={mailError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <MailOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    size='small'
                    autoComplete="email"
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
                <FormControl fullWidth variant="standard" size='small'>
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        required
                        id="standard-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        aria-describedby="cnfrm-pwd-helper-text"
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
                    <FormHelperText id="cnfrm-pwd-helper-text" error>{confirmPasswordErrorText}</FormHelperText>
                </FormControl>
                <TextField
                    required
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Display Name"
                    value={name}
                    onChange={handleNameChange}
                    helperText={nameError ? "Should not be empty" : ""}
                    error={nameError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    size='small'
                />
            </Box>

            <Box m={2} px={7} mt={3}>
                <Button fullWidth variant="contained" onClick={handleSignup} disabled={loading ? true : false}>Submit</Button>
            </Box>
        </>
    )
}

export default EmailSignupForm