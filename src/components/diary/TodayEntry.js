import React from 'react'
import { Box } from '@mui/material';
import DiaryEntryForm from '../forms/DiaryEntryForm';

function TodayEntry() {

    return (
        <Box>
            <h4>Today's Diary Entry</h4>
            <DiaryEntryForm/>
        </Box>
    )
}

export default TodayEntry