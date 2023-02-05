import React from 'react'
import PageFlip from '../../pages/test/PageFlip'
import { Box, Typography } from '@mui/material';


function PastEntries() {

    return (
        <Box>
            <Typography variant="h6" component="h6">Travel back in memories here....</Typography>
            <PageFlip />
        </Box>
    )
}

export default PastEntries