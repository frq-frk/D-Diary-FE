import React from 'react'
import { Grid, Typography, Avatar, Paper, Box } from '@mui/material'
import { useSelector } from 'react-redux'

function ReadableProfile(props) {

    const { currentUser } = useSelector(state => state.user)

    return (
        <Box sx={{
            margin: 1,
            padding: 2,
            backgroundColor:'decoratory.main'
        }}>
            <Grid container spacing={2} direction={'row'} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent'
            }}>
                <Grid item xs={4} sx={{
                    textAlign: 'start',
                    background: 'transparent'
                }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={currentUser && currentUser.photoURL ? currentUser.photoURL : "/images/dummyProfile.jpg"}
                        sx={{ width: 80, height: 80 }}
                    />
                    <Typography variant="subtitle2" component="h6" margin={2}>{currentUser && currentUser.displayName}</Typography>
                </Grid>
                <Grid item xs={8} sx={{
                    textAlign: 'start',
                    background: 'transparent'
                }}>
                    <Typography variant="subtitle2" component="h6" my={1}>{`Email : ${currentUser && currentUser.email}`}</Typography>
                    <Typography variant="subtitle2" component="h6" my={1}>{`Joined on : ${props.props.joinMonth ? props.props.joinMonth : "month"} ${props.props.joinYear ? props.props.joinYear : "year"}`}</Typography>
                    <Typography variant="subtitle2" component="h6" my={1}>{`Total Entries : ${props.props.totalEntries ? props.props.totalEntries : "unknown"}`}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ReadableProfile