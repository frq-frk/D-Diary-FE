import * as types from "./actionTypes"

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_START:
            return {
                ...state,
                loading: true,
            }

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.providerData[0],
                token: action.payload.accessToken,
            }

        case types.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case types.LOGOUT_START:
            return {
                ...state,
                loading: true,
            }

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: null,
                token: null,
                error : null,
            }

        case types.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case types.LOADING_START:
            return {
                ...state,
                loading: true,
            }

        case types.LOADING_STOP:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}

export { userReducer };