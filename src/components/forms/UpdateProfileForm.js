import {
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadingInitiate, loadingEnd } from '../../redux/actions'
import axios from 'axios'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

function UpdateProfileForm() {
  const [professionField, setProfessionField] = useState('')
  const [bioField, setBioField] = useState('')
  const [weeklyGoalField, setWeeklyGoalField] = useState('')
  const [monthlyGoalField, setMonthlyGoalField] = useState('')
  const [shortTermGoalField, setShortTermGoalField] = useState('')
  const [longTermGoalField, setLongTermGoalField] = useState('')
  const [msg, setMsg] = useState(null)
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(false)

  const { loading, token, currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleProfessionChange = (event) => {
    setProfessionField(event.target.value)
  }

  const handleBioChange = (event) => {
    setBioField(event.target.value)
  }

  const handleWeeklyGoalChange = (event) => {
    setWeeklyGoalField(event.target.value)
  }

  const handleMonthlyGoalChange = (event) => {
    setMonthlyGoalField(event.target.value)
  }

  const handleShortTermGoalChange = (event) => {
    setShortTermGoalField(event.target.value)
  }

  const handleLongTermGoalChange = (event) => {
    setLongTermGoalField(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setMsg(null)
    setOpen(false)
  }

  const handleDialogOpen = () => {
    setDialog(true)
  }

  const handleDialogClose = () => {
    setDialog(false)
  }

  const fetchAndUpdateFields = () => {
    axios
      .get('http://localhost:5000/v1/user/get-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfessionField(response.data.profession)
        setBioField(response.data.bio)
        setWeeklyGoalField(response.data.weekGoal)
        setMonthlyGoalField(response.data.monthGoal)
        setShortTermGoalField(response.data.shortTermGoal)
        setLongTermGoalField(response.data.longTermGoal)
      })
      .catch((e) => console.log(e)  )
  }

  const handleProfileUpdate = () => {
    dispatch(loadingInitiate())
    const data = {
      profession: professionField,
      bio: bioField,
      weekGoal: weeklyGoalField,
      monthGoal: monthlyGoalField,
      shortTermGoal: shortTermGoalField,
      longTermGoal: longTermGoalField,
    }

    axios
      .put('http://localhost:5000/v1/user/update-profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        setMsg('Successfully updated your Profile')
      })
      .catch((e) => {
         
        setMsg('Error Occured while updtaing your profile!!!')
      })
    setDialog(false)
    setOpen(true)
    dispatch(loadingEnd())
    fetchAndUpdateFields()
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
    fetchAndUpdateFields()
  }, [currentUser])

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 3,
        padding: 3,
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {msg}
        </Alert>
      </Snackbar>
      <Typography variant="h6" component="h5">
        Update Profile
      </Typography>
      <TextField
        id="Profession"
        rows={4}
        margin="dense"
        label="profession"
        helperText="Title of your profession"
        value={professionField}
        onChange={handleProfessionChange}
        size="small"
        fullWidth
      />
      <TextField
        id="bio"
        multiline
        rows={2}
        margin="dense"
        label="Bio"
        helperText="Describe briefly about yourself"
        value={bioField}
        onChange={handleBioChange}
        size="small"
        fullWidth
      />
      <TextField
        id="week Goal"
        multiline
        rows={2}
        margin="dense"
        label="weekly Goal"
        helperText="This field is for you to keep note of your goal to accomplish this week"
        value={weeklyGoalField}
        onChange={handleWeeklyGoalChange}
        size="small"
        fullWidth
      />
      <TextField
        id="month Goal"
        multiline
        rows={2}
        margin="dense"
        label="monthly Goal"
        helperText="This field is for you to keep note of your goal to accomplish this month"
        value={monthlyGoalField}
        onChange={handleMonthlyGoalChange}
        size="small"
        fullWidth
      />
      <TextField
        id="short term Goal"
        multiline
        rows={2}
        margin="dense"
        label="short term Goal"
        helperText="This field is for you to keep note of your goal to accomplish within months, year or a two"
        value={shortTermGoalField}
        onChange={handleShortTermGoalChange}
        size="small"
        fullWidth
      />
      <TextField
        id="long term Goal"
        multiline
        rows={2}
        margin="dense"
        label="long term Goal"
        helperText="This field is for you to keep note of your major goal to accomplish"
        value={longTermGoalField}
        onChange={handleLongTermGoalChange}
        size="small"
        fullWidth
      />

      <Button
        variant="contained"
        disabled={loading ? true : false}
        color="primary"
        onClick={handleDialogOpen}
      >
        Update
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Confirmation??'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to proceed with updating your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleProfileUpdate} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default UpdateProfileForm
