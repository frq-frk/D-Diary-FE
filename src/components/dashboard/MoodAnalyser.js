import React from 'react'
import { Typography, Skeleton } from '@mui/material'

function MoodAnalyser() {
    return (
        <div>
            <Typography variant="h6">Mood Analyser</Typography>
            <Skeleton variant="rounded"  height={300} />
        </div>
    )
}

export default MoodAnalyser