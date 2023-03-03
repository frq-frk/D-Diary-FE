import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'

function IconGroup() {
  const navigate = useNavigate()

  const getToken = () => {
    console.log(auth.getIdToken())
  }

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">Quick Links</Typography>
      <Grid container spacing={2} direction={'row'} my={2}>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <CreateIcon
              fontSize="large"
              onClick={() => navigate('/entry')}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <AutoStoriesIcon
              fontSize="large"
              onClick={() => navigate('/pastentries')}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <ListAltIcon
              fontSize="large"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <NoteAltIcon
              fontSize="large"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <CreateIcon
              fontSize="large"
              onClick={getToken}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IconGroup
