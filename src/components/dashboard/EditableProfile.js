import React from 'react'
import { Grid, Typography, Paper } from '@mui/material'
import { Box } from '@mui/system'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom'

function EditableProfile(props) {

    const navigate = useNavigate();

    return (
        <Grid item xs={12} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            textAlign: 'start'
        }}>
            <Paper elevation={3} sx={{
                margin: 1,
                padding: 2
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row-reverse'
                }}>
                    <ModeEditIcon onClick={() => navigate("/updateprofile")} sx={{
                        '&:hover': {
                            cursor:'pointer'
                        }
                    }}/>
                </Box>
                <Typography variant="subtitle2" component="h6" my={3}>{`Profession : ${props.props.profession}`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Bio : ${props.props.bio}`}</Typography>
                <Typography variant="h6" component="h6">Goals</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Weekly : ${props.props.weekGoal}`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Monthly : ${props.props.monthGoal}`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Short Term : ${props.props.shortTermGoal}`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Long Term : ${props.props.longTermGoal}`}</Typography>
            </Paper>
        </Grid>
    )
}

export default EditableProfile