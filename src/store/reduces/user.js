import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    CREATING_USER,
    USER_CREATED,
    USER_FAILED
} from "../actions/actionTypes"

const initialState = {
    name: null,
    email: null,
    isUploading: false,
    isCreated: false,
    isFailed: false,
    message: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            }
        case USER_LOGGED_OUT:
            return {
                state
            }
        case CREATING_USER:
            return {
                ...state,
                isUploading: true,
                isCreated: false
            }
        case USER_CREATED:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                isUploading: false,
                isCreated: true
            }
        case USER_FAILED:
            return {
                ...state,
                isUploading: false,
                isCreated: false,
                isFailed: true,
                message: action.payload.message
            }
        default:
            return state
    }
}

export default reducer
