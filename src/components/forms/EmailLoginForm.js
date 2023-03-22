import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControl, InputLabel, Input, IconButton, Box, Button } from '@mui/material'
import { emailLoginInitiate } from '../../redux/actions';
import { colors } from '../../theme/Colors';

function EmailLoginForm() {

    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);

    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

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
                        required
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
            </Box>

            <Box m={2} px={7} mt={3}>
                <Button fullWidth variant="contained" onClick={handleLogin} disabled={loading ? true : false}>Submit</Button>
            </Box>
        </>
    )
}

export default EmailLoginForm