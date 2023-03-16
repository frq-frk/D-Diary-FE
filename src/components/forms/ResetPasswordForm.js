import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Box, Button } from '@mui/material'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { resetPassword } from '../../utils/FirebaseUtils';

function ResetPasswordForm() {

    const [mail, setMail] = React.useState("");
    const [msg, setMsg] = React.useState(null);

    const { loading } = useSelector(state => state.user)

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handleSubmit = () => {
        console.log(mail);
        resetPassword(mail)
        .then((res) => {
            console.log(res);
            setMsg("A link to reset password has been sent to your mail. Please check !!")
        })
        .catch((e) => {
            console.log(e);
            setMsg("Error occured while sending email")
        })
        setMail("");
    }

    return (
        <>
            <h1>Reset Password</h1>
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
            </Box>

            {msg && <p>{msg}</p>}

            <Box m={2} px={7} mt={3}>
                <Button fullWidth variant="contained" onClick={handleSubmit} disabled={loading || msg ? true : false}>send email</Button>
            </Box>
        </>
    )
}

export default ResetPasswordForm