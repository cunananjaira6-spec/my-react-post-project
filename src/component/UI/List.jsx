import {useState, useEffect} from 'react';
import axios from 'axios';


export default function List()
{
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data); //save data to state
            }

            catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []); //empty dependency array means this effect will run only once when the component mounts

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}