import React, {useEffect} from 'react'
import { Grid, Stack, Skeleton, Typography } from '@mui/material'
import Profile from '../../components/dashboard/Profile'
import IconGroup from '../../components/dashboard/IconGroup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {

  const { currentUser, isVerified } = useSelector(state => state.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else if (isVerified != null && !isVerified) {
      navigate('/verifyemail')
    }
  }, []);

  return (
    <Grid container spacing={2} direction={'row'}>
      <Grid item xs={12} sm={8} md={2} m={2}>
        <Stack spacing={1}>
          <Typography variant='h6'>Quote of the Day</Typography>
          <Skeleton variant="rounded" height={100} />
          <Typography variant='h6'>Have you ever heard?(short story)</Typography>
          <Skeleton variant="rounded" height={400} />
        </Stack>
      </Grid>
      <Profile />
      <IconGroup />
    </Grid>
  )
}

export default Dashboard