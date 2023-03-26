import React from 'react'
import { Grid } from '@mui/material'
import Profile from '../../components/dashboard/Profile'
import IconGroup from '../../components/dashboard/IconGroup'

function Dashboard() {
  return (
    <Grid container spacing={2} direction={'row'} sx={{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }}>
        <Profile/>
        <IconGroup/>
    </Grid>
  )
}

export default Dashboard