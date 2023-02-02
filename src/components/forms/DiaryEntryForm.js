import React, { useState } from 'react'
import { Paper, TextField, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getCurrentDate, day } from '../../utils/DateUtils'
import { loadingInitiate, loadingEnd } from '../../redux/actions'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function DiaryEntryForm() {

    const { currentUser, token, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();

    const [place, setPlace] = useState("")
    const [description, setDescription] = useState("")
    const [thoughts, setThoughts] = useState("")
    const [msg, setMsg] = useState(null)
    const [open, setOpen] = React.useState(false);


    const handlePlaceChange = (event) => {
        setPlace(event.target.value)
    }
    const handleDescChange = (event) => {
        setDescription(event.target.value)
    }

    const handleThoughtChange = (event) => {
        setThoughts(event.target.value)
    }

    const handleEntrySubmit = (event) => {
        dispatch(loadingInitiate())
        const text = `Entry: ${getCurrentDate('/')}\n${day}\n${place}\n\nDear Diary\n${description}\n${thoughts}\n\nYour's lovingly\n${currentUser.displayName}`;
        console.log(text);
        axios.post("http://localhost:5000/entry", {
            "entry": text
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response);
                setMsg("Successfully saved your entry to your diary")
            }).catch((e) => {
                console.log(e);
                setMsg("Error Occured while saving your entry!!!")
            })
        setOpen(true)
        dispatch(loadingEnd())
        setPlace("");
        setDescription("");
        setThoughts("");
        event.preventDefault();
    }
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMsg(null)
        setOpen(false);
      };

    return (
        <Paper elevation={3} sx={{
            height: '100%',
            backgroundColor: 'decoratory.main',
            padding: '5%',
            textAlign: 'left'
        }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity="info">{msg}</Alert></Snackbar>
            <h5> Entry: {getCurrentDate('/')} </h5>
            <h5>{day}</h5>
            <TextField
                id="place"
                variant="standard"
                margin="dense"
                label="Place"
                helperText="Please enter your current place"
                value={place}
                onChange={handlePlaceChange}
                size="small"
            />
            <h5>Dear Diary</h5>
            <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                margin="dense"
                label="Description"
                helperText="Describe your day briefly including your day activities"
                value={description}
                onChange={handleDescChange}
                size="small"
                fullWidth
            />

            <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                margin="dense"
                label="thoughts and feelings"
                helperText="Describe your thoughts and feelings about the day"
                value={thoughts}
                onChange={handleThoughtChange}
                size="small"
                fullWidth
            />
            <h5> Your's lovingly </h5>
            <h5> {currentUser && currentUser.displayName} </h5>
            {loading ? <CircularProgress /> :  <Button variant="contained" disabled = {loading ? true : false} color='primary' onClick={handleEntrySubmit}>Submit</Button>}
        </Paper>
    )
}

export default DiaryEntryForm