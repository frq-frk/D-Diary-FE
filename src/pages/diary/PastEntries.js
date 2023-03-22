import React, { useEffect } from 'react'
import PageFlip from '../../pages/test/PageFlip'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { getCurrentMonth, getCurrentYear } from '../../utils/DateUtils';
import EntriesTraverser from '../../components/forms/EntriesTraverser';


function PastEntries() {

    const { currentUser, isVerified } = useSelector(state => state.user)

    const [month, setMonth] = React.useState(getCurrentMonth());
    const [year, setYear] = React.useState(getCurrentYear)

    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        } else if (isVerified != null && !isVerified) {
            navigate('/verifyemail')
        }
        console.log(month)
        console.log(year)
    }, [currentUser, navigate, isVerified, month, year])


    return (
        <Box sx={{ m: 1 }}>
            <Grid container>
                <Grid item xs={12} sm={12} lg={2}>
                    <EntriesTraverser year={year} month={month} setMonth={setMonth} setYear={setYear} />
                </Grid>
                <Grid item xs={12} sm={12} lg={10}>
                    <PageFlip year={year} month={month} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PastEntries