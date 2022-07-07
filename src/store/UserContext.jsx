import {createContext, useReducer} from 'react';
import userReducer from './UserReducers';
const githubFinderToken = import.meta.env.VITE_GITHUB_FINDER;
const githubURL = import.meta.env.VITE_GITHUB_URL;
const UserContext = createContext();

export const UserProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(userReducer, initialState)
    
    // get initial users
    const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${githubURL}/users`, {
            headers: {
                Authorization: `token ${githubFinderToken}`
            }
        })
        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    } 

    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }
    return <UserContext.Provider value={{state, fetchUsers}}>{children}</UserContext.Provider>
}

export default UserContext;