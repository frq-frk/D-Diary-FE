import React, {useEffect} from 'react'
import PageFlip from '../../pages/test/PageFlip'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


function PastEntries() {

    const { currentUser, isVerified } = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }else if(isVerified != null && !isVerified){
            navigate('/verifyemail')
        }
    }, [currentUser, navigate, isVerified])


    return (
        <Box sx={{m : 5}}>
            <Typography variant="h6" component="h6">Travel back in memories here....</Typography>
            <PageFlip />
        </Box>
    )
}

export default PastEntries