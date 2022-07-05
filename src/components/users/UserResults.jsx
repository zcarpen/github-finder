import {useEffect, useState} from 'react'
const githubFinderToken = import.meta.env.VITE_GITHUB_FINDER;
const githubURL = import.meta.env.VITE_GITHUB_URL;
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {
    useEffect(() => {
        fetchUsers()
    }, [])
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUsers = async () => {
        const response = await fetch(`${githubURL}/users`, {
            headers: {
                Authorization: `token ${githubFinderToken}`
            }
        })
        const data = await response.json()
        setUsers(data);
        setLoading(false);
    } 

    if (!loading) {
        console.log('not loading')
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => {
                    return <UserItem key={user.id} user={user}/>
                })}
            </div>
        )
    } else {
        return <Spinner />
    }
}

export default UserResults
