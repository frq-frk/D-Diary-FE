import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { auth } from '../firebase'; 
import { useLocation } from "react-router-dom";
import { applyActionCode } from '@firebase/auth';

function FirebaseEmailRouteHandler() {

    const navigate = useNavigate()
    const [msg, setMsg] = React.useState(null)
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const mode = query.get('mode');
        const actionCode = query.get('oobCode');
        const continueUrl = query.get('continueUrl');
        const lang = query.get('lang') || 'en';

        const emailVerification = (code) => {
            applyActionCode(auth, actionCode).then((resp) => {
                navigate('/updateProfile')
            }).catch((error) => {
                setMsg("Error occured while verifying your email. Please try again!!")
            });
        }

        switch (mode) {
            case 'resetPassword':
                navigate('/newPassword', { state: { 'oobCode': actionCode } })
                break;
            case 'recoverEmail':
                setMsg("Invalid mode")
                break;
            case 'verifyEmail':
                emailVerification(actionCode);
                break;
            default:
                setMsg("Invalid mode")
        }
    }, []);

    return (
        <>{msg && msg}</>
    )
}

export default FirebaseEmailRouteHandler