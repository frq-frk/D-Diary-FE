import React from 'react'
import { Box, Grid } from '@mui/material'

function ImageFiller({image}) {
    return (
        <Grid item xs={12} sm={7} md={7}>
            <Box sx={{
                height : '100%',
                padding : '1%',
                borderRadius : '10px',
            }}>
            <img
                    src={image}
                    alt='filler img'
                    style={{'height' : '100%', 'width' : '100%', }}
                />
            </Box>
        </Grid>
    )
}

export default ImageFiller