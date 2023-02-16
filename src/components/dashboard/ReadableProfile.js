import React from 'react'
import { Grid, Typography, Avatar, Paper } from '@mui/material'
import { useSelector } from 'react-redux'

function ReadableProfile(props) {

    const { currentUser } = useSelector(state => state.user)

    return (
        <Grid item xs={12}>
            <Paper elevation={3} sx={{
                margin: 1,
                padding: 2
            }}>
                <Grid container spacing={2} direction={'row'} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Grid item xs={4} sx={{
                        textAlign: 'start'
                    }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={currentUser && currentUser.photoURL ? currentUser.photoURL : "/images/dummyProfile.jpg"}
                            sx={{ width: 80, height: 80 }}
                        />
                        <Typography variant="subtitle2" component="h6" margin={2}>{currentUser && currentUser.displayName}</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{
                        textAlign: 'start'
                    }}>
                        <Typography variant="subtitle2" component="h6" my={1}>{`Email : ${currentUser && currentUser.email}`}</Typography>
                        <Typography variant="subtitle2" component="h6" my={1}>{`Joined on : ${props.props.joinMonth} ${props.props.joinYear}`}</Typography>
                        <Typography variant="subtitle2" component="h6" my={1}>{`Total Entries : ${props.props.totalEntries}`}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ReadableProfile