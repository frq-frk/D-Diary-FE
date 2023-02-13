import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../../firebase';
import { sendEmail } from '../../utils/FirebaseUtils';
import { loadingEnd, loadingInitiate } from '../../redux/actions';

function VerifyEmailPage() {

    const { currentUser, loading, isVerified } = useSelector(state => state.user)

    const [msg, setMsg] = useState(null)
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }else if(isVerified){
            navigate('/')
        }
    }, [currentUser, navigate, isVerified])

    const resendEmailVerificaiton = async () => {
        dispatch(loadingInitiate())
        await sendEmail(auth.currentUser).then((m) => {
            setMsg(m);
        }).catch((e) => {
            setMsg(e);
        })
        setOpen(true)
        dispatch(loadingEnd())
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsg(null)
        setOpen(false);
    };

    return (
        <Box sx={{ m: 4 }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="info">{msg}</Alert></Snackbar>
            <Typography variant="body1" component="p">Please verify your email by clicking the link sent to your registered email.</Typography>
            <Typography variant="body1" component="p">To resend click here</Typography>
            <Button onClick={resendEmailVerificaiton} disabled={loading}>Resend Email</Button>
            {loading && <CircularProgress sx={{width:10, display:'block', margin:'auto'}}/>}
        </Box>
    )
}

export default VerifyEmailPage