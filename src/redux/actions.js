import * as types from "./actionTypes"
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

export const loginInitiate = () => {

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