import {createContext, useState} from 'react';
const githubFinderToken = import.meta.env.VITE_GITHUB_FINDER;
const githubURL = import.meta.env.VITE_GITHUB_URL;
const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchUsers = async () => {
        console.log(githubFinderToken, githubURL)
        const response = await fetch(`${githubURL}/users`, {
            headers: {
                Authorization: `token ${githubFinderToken}`
            }
        })
        const data = await response.json()
        setUsers(data);
        setLoading(false);
    } 
    return <UserContext.Provider value={{users, loading, fetchUsers}}>{children}</UserContext.Provider>
}

export default UserContext;