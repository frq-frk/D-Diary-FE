import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Box, Button } from '@mui/material'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { resetPassword } from '../../utils/FirebaseUtils';
import { toast } from 'react-toastify';
import { emailValidator } from '../../utils/AuthUtils';

function ResetPasswordForm() {

    const [mail, setMail] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const [mailError, setMailError] = React.useState(false);

    const { loading } = useSelector(state => state.user)

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handleSubmit = () => {
        console.log(mail);

        if(!emailValidator(mail)){
            setMailError(true)
            return
        }

        resetPassword(mail)
        .then((res) => {
            console.log(res);
            setSubmitted(true);
            toast.success("A link to reset password has been sent to your mail. Please check !!",{
                position: 'bottom-left',
                toastId: 1
            })
        })
        .catch((e) => {
            console.log(e);
            toast.error("Error occured while sending email, please check the mail",{
                position: 'bottom-left',
                toastId: 1
            })
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
                    helperText="Please enter a valid email"
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
                />
            </Box>

            <Box m={2} px={7} mt={3}>
                <Button fullWidth variant="contained" onClick={handleSubmit} disabled={loading || submitted ? true : false}>send email</Button>
            </Box>
        </>
    )
}

export default ResetPasswordForm