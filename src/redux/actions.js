import * as types from './actionTypes'
import { auth } from '../firebase'
import { deleteUser, updateProfile } from 'firebase/auth'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAdditionalUserInfo
} from 'firebase/auth'
import { sendEmail } from '../utils/FirebaseUtils'
import { createProfile } from '../utils/AuthUtils'

const signupWithEmailSuccess = (user) => ({
  type: types.SIGN_UP_WITH_EMAIL_SUCCESS,
  payload: user,
})

const loginWithEmailSuccess = (user) => ({
  type: types.LOGIN_WITH_EMAIL_SUCCESS,
  payload: user,
})

const loginStart = () => ({
  type: types.LOGIN_START,
})

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
})

const loginFail = (err) => ({
  type: types.LOGIN_FAIL,
  payload: err,
})

const logoutStart = () => ({
  type: types.LOGOUT_START,
})

const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
})

const logoutFail = (err) => ({
  type: types.LOGOUT_FAIL,
  payload: err,
})

const loadingStart = () => ({
  type: types.LOADING_START,
})

const loadingStop = () => ({
  type: types.LOADING_STOP,
})

const userExists = (user) => ({
  type: types.USER_EXISTS,
  payload: user,
})

export const updateUserProfile = (obj) => ({
  type: types.UPDATE_USER_PROFILE,
  payload: obj
})

export const googleLoginInitiate = () => {
  const googleAuthProvider = new GoogleAuthProvider()
  return async function (dispatch) {
    dispatch(loginStart())

    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result.user.uid)
        const { isNewUser } = getAdditionalUserInfo(result)
        if (isNewUser) {
          console.log(`creating a profile ${result.user.accessToken}`)
          createProfile(result.user.accessToken)
        }
        dispatch(loginSuccess(result.user))
      })
      .catch((err) => {
        dispatch(loginFail(err))
      })
  }
}

export const facebookLoginInitiate = () => {
  const fbAuthProvider = new FacebookAuthProvider()
  return async function (dispatch) {
    dispatch(loginStart())
    await signInWithPopup(auth, fbAuthProvider)
      .then((result) => {
        const { isNewUser } = getAdditionalUserInfo(result)
        if (isNewUser) {
          console.log(`creating a profile ${result.user.accessToken}`)
          createProfile(result.user.accessToken)
        }
        dispatch(loginSuccess(result.user))
      })
      .catch((err) => {
        dispatch(loginFail(err))
      })
  }
}

export const emailSignupInitiate = ({ email, passwd, dName }) => {
  console.log(email)
  console.log(passwd)
  return async function (dispatch) {
    dispatch(loginStart())
    await createUserWithEmailAndPassword(auth, email, passwd)
      .then((result) => {
        console.log(email)
        console.log(passwd)
        updateProfile(result.user, {
          displayName: dName,
        })
          .then(() => {
            dispatch(signupWithEmailSuccess(result.user))
            sendEmail(result.user).then((msg) => {
              console.log(`creating a profile ${result.user.accessToken}`)
              createProfile(result.user.accessToken)
            }).catch(e => console.log(e))
          })
          .catch((err) => {
            console.log(err)
            deleteUser(result.user)
              .then(() => {
                dispatch(loginFail('Error while creating user'))
              })
              .catch((e) => { })
          })
      })
      .catch((err) => {
        dispatch(loginFail(err))
      })
  }
}

export const emailLoginInitiate = ({ email, passwd }) => {
  return async function (dispatch) {
    dispatch(loginStart())
    await signInWithEmailAndPassword(auth, email, passwd)
      .then((result) => {
        console.log(result.user)
        dispatch(loginWithEmailSuccess(result.user))
      })
      .catch((err) => {
        dispatch(loginFail(err))
      })
  }
}

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart())

    auth
      .signOut()
      .then((result) => {
        console.log(result)
        dispatch(logoutSuccess())
      })
      .catch((err) => {
        console.log(err)
        dispatch(logoutFail())
      })
  }
}

export const checkLoggedIn = (user) => {
  console.log(user)
  return async function (dispatch) {
    dispatch(userExists(user))
  }
}

export const loadingInitiate = () => {
  return function (dispatch) {
    dispatch(loadingStart())
  }
}

export const loadingEnd = () => {
  return function (dispatch) {
    dispatch(loadingStop())
  }
}
