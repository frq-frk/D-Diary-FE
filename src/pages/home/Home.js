import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { checkLoggedIn } from '../../redux/actions'
import Dashboard from '../profile/Dashboard'

import { auth } from '../../firebase'
function Home() {
  const { currentUser, isVerified } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [currentAuth, setUser] = useState(null)
  const navigate = useNavigate()

  const [userLoggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // if (!currentUser) {
        // } else if (isVerified != null && !isVerified) {
        //   navigate('/verifyemail')
        // }
        console.log(user)
        dispatch(checkLoggedIn(user))
        setLoggedIn(true)
      } else {
        navigate('/login')
        setLoggedIn(false)
      }
    })
  }, [navigate, userLoggedIn])

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {/* <FullWidthTabs/>             */}
      {/* <p>This is Home</p> */}
      <Dashboard />
    </Box>
  )
}

export default Home
