import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    CREATING_USER,
    USER_CREATED,
    USER_FAILED,
    RESET
} from "./actionTypes"
import axios from 'axios'
import auth from '@react-native-firebase/auth'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAxtWHx9MwDLvKPKbxMX1BOnxwDubw0OLw'

export const login = (user) => {
    return dispatch => {
        console.log(user)
        dispatch(creatingUser())
        auth().onAuthStateChanged(user.email, user.password)

        .catch(err => {
            dispatch(userFailed(err))
            console.log(err)
        })

        .then(res => {
            dispatch(userCreated(user))
            console.log(res)
        })
        
        // type: USER_LOGGED_IN,
        // payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {

        console.log(user)
        dispatch(creatingUser())
        auth().createUserWithEmailAndPassword(user.email, user.password)

            .catch(err => {
                dispatch(userFailed(err))
                console.log('erro aqui 1')
                console.log(err)
                return
            })

            .then(res => {
                console.log('resposta aqui 1')
                console.log(res)
                if (res != undefined && res.user.uid) {
                    axios.put(`/users/${res.user.uid}.json`, {
                        name: user.name
                    })

                        .catch(err => {
                            dispatch(userFailed(err))
                            console.log('erro aqui 2')
                            console.log(err)
                            return
                        })

                        .then(res => {
                            console.log('resposta aqui 2')
                            dispatch(userCreated(user))
                            console.log("Usuário criado com sucesso")
                        })
                }
            })
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

export const creatingUser = () => {
    return {
        type: CREATING_USER
    }
}

export const userCreated = (user) => {
    return {
        type: USER_CREATED,
        payload: user
    }
}

export const userFailed = (err) => {
    return {
        type: USER_FAILED,
        payload: err
    }
}

