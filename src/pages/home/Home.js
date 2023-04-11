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
      if (user && user.emailVerified) {
        dispatch(checkLoggedIn(user))
        navigate('/dashboard')
      }else if(user){
        navigate('/verifyEmail')
      } else {
        navigate('/login')
      }
    })
    dispatch(loadingEnd())
  }, [dispatch, navigate])

  return <CircularProgress />
}

export default Home
