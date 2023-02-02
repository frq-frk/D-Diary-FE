import React from 'react'
import { Box } from '@mui/material';
import DiaryEntryForm from '../forms/DiaryEntryForm';

function TodayEntry() {

    return (
        <Box>
            <h4>Today's Diary Entry</h4>
            <h6>can't be deleted or edited once saved. Please be sure when you are saving.</h6>
            <DiaryEntryForm/>
        </Box>
    )
}

export default TodayEntry