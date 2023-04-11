import React from 'react'
import { Box, Grid } from '@mui/material'

function ImageFiller({ image }) {
    return (
        <Box sx={{
            height: '90%',
            padding: '1%',
        }}>
            <img
                src={image}
                alt='filler img'
                style={{ 'height': '100%', 'width': '100%', 'borderRadius': '10px' }}
            />
        </Box>
    )
}

export default ImageFiller