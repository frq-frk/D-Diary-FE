import React, { useState, useEffect } from 'react'
import { Paper, TextField, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getCurrentDate, day } from '../../utils/DateUtils'
import { loadingInitiate, loadingEnd } from '../../redux/actions'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function DiaryEntryForm() {

    const { currentUser, token, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     axios.get(`http://localhost:5000/entrybytoday`, {
    //         headers: {
    //             'Authorization': `Bearer ${this.state.token}`
    //         }
    //     }).then((res) => {
    //         console.log(res)
    //     })
    // })

    const [place, setPlace] = useState("")
    const [description, setDescription] = useState("")
    const [thoughts, setThoughts] = useState("")
    const [msg, setMsg] = useState(null)
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


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
        setDialog(false)
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

    const handleDialogOpen = () => {
        setDialog(true);
      };

    const handleDialogClose = () => {
        setDialog(false);
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
            {loading ? <CircularProgress /> : <Button variant="contained" disabled={loading ? true : false} color='primary' onClick={handleDialogOpen}>Save</Button>}
            <Dialog
                fullScreen={fullScreen}
                open={dialog}
                onClose={handleDialogClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirmation!!!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Can't be deleted or edited once saved!!! Please be sure when you are saving.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleEntrySubmit} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default DiaryEntryForm