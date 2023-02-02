import { Box } from '@mui/material'
import React from 'react'

function CustomFooter() {
  return (
    <Box sx={{
        height : 100,
        backgroundColor : 'secondary.main',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        position:'fixed',
        bottom:'0px',
        left:'0px',
        right:'0px'
    }}>
        Copyright @ 2023 Saiyans
    </Box>
  )
}

export default CustomFooter