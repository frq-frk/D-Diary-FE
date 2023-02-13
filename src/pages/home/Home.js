import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import FullWidthTabs from '../../components/customtabs/FullWidthTabs'

function Home() {

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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* <FullWidthTabs/>             */}
            <p>This is Home</p>
        </Box>
    )
}

export default Home