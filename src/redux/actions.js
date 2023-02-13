import * as types from "./actionTypes"
import { auth } from "../firebase";
import { deleteUser, updateProfile } from "firebase/auth";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { sendEmail } from "../utils/FirebaseUtils";

const signupWithEmailSuccess = (user) => ({
    type : types.SIGN_UP_WITH_EMAIL_SUCCESS,
    payload: user
})

const loginWithEmailSuccess = (user) => ({
    type : types.LOGIN_WITH_EMAIL_SUCCESS,
    payload: user
})

const loginStart = () => ({
    type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});

const loginFail = (err) => ({
    type: types.LOGIN_FAIL,
    payload: err,
})

const logoutStart = () => ({
    type: types.LOGOUT_START,
});

const logoutSuccess = (user) => ({
    type: types.LOGOUT_SUCCESS,
});

const logoutFail = (err) => ({
    type: types.LOGOUT_FAIL,
    payload: err,
})

const loadingStart = () => ({
    type : types.LOADING_START,
});

const loadingStop = () => ({
    type : types.LOADING_STOP,
});

export const googleLoginInitiate = () => {

    const googleAuthProvider = new GoogleAuthProvider()
    return async function (dispatch) {
        dispatch(loginStart());

        await signInWithPopup(auth, googleAuthProvider).then((result) => {
            dispatch(loginSuccess(result.user));
        }).catch((err) => {
            dispatch(loginFail(err));
        })

    }
}

export const facebookLoginInitiate = () => {

    const fbAuthProvider = new FacebookAuthProvider()
    return async function (dispatch) {
        dispatch(loginStart());
        await signInWithPopup(auth, fbAuthProvider).then((result) => {
            console.log(result)
            dispatch(loginSuccess(result.user));
        }).catch((err) => {
            dispatch(loginFail(err));
        })

    }
}

export const emailSignupInitiate = ({email, passwd, dName}) => {

    return async function (dispatch) {
        dispatch(loginStart());
        await createUserWithEmailAndPassword(auth, email, passwd).then((result) => {
            updateProfile(result.user,{
                displayName: dName
            }).then(() => {
                dispatch(signupWithEmailSuccess(result.user));
                sendEmail(result.user)
            }).catch(() => {
                deleteUser(result.user).then(() => {
                    dispatch(loginFail("Error while creating user"));
                }).catch((e) => {
                    console.log(e);
                })
            })
            
        }).catch((err) => {
            dispatch(loginFail(err));
        })

    }
}

export const emailLoginInitiate = ({email, passwd}) => {

    return async function (dispatch) {
        dispatch(loginStart());
        await signInWithEmailAndPassword(auth, email, passwd).then((result) => {
            dispatch(loginWithEmailSuccess(result.user));
        }).catch((err) => {
            dispatch(loginFail(err));
        })

    }
}

export const logoutInitiate = () => {

    return function (dispatch) {
        dispatch(logoutStart());

        auth.signOut().then((result) => {
            console.log(result);
            dispatch(logoutSuccess())
        }).catch((err) => {
            console.log(err);
            dispatch(logoutFail())
        })
    }

}

export const loadingInitiate = () => {
    return function(dispatch){
        dispatch(loadingStart());
    }
}

export const loadingEnd = () => {
    return function(dispatch){
        dispatch(loadingStop());
    }
}