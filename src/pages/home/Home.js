import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import FullWidthTabs from '../../components/customtabs/FullWidthTabs'

function Home() {

    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [currentUser, navigate])

    

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <FullWidthTabs/>            
        </Box>
    )
}

export default Home