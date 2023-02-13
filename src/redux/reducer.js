import * as types from "./actionTypes"

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
    token: null,
    isVerified: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SIGN_UP_WITH_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.providerData[0],
                token: action.payload.accessToken,
                isVerified: action.payload.emailVerified,
            }

            case types.LOGIN_WITH_EMAIL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    currentUser: action.payload.providerData[0],
                    token: action.payload.accessToken,
                    isVerified: action.payload.emailVerified,
                }

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
                error: null,
                isVerified: null,
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