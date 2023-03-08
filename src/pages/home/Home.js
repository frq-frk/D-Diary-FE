import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkLoggedIn, loadingEnd, loadingInitiate } from '../../redux/actions'
import { auth } from '../../firebase'

import CircularProgress from '@mui/material/CircularProgress'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadingInitiate())
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(checkLoggedIn(user))
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    })
    dispatch(loadingEnd())
  }, [dispatch, navigate])

  return <CircularProgress />
}

export default Home
