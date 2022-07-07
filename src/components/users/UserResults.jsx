import {useContext} from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import UserContext from '../../store/UserContext';


function UserResults() {
    const {state} = useContext(UserContext);
    
    if (!state.loading) {
        return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {state.users.map(user => {
                return <UserItem key={user.id} user={user}/>
            })}
        </div>
      )
    } else {
        return <Spinner />
    }
}

export default UserResults
