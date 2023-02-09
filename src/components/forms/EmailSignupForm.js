import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControl, InputLabel, Input, IconButton, Box, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { emailSignupInitiate } from '../../redux/actions';

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

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSignup = () => {
        console.log("mail :" + mail);
        console.log("password :" + password);
        console.log("confirm pwd :" + confirmPassword);
        console.log("name :" + name);
        const obj = {
            email: mail,
            passwd: password,
            dName: name
        }
        dispatch(emailSignupInitiate(obj))
        setMail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
    }

    return (
        <>
            <h1>Signup</h1>
            <Box m={1} px={8}>
                <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Mail"
                    value={mail}
                    onChange={handleMailChange}
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
                <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Display Name"
                    value={name}
                    onChange={handleNameChange}
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