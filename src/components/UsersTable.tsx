import {useState} from 'react';
import {useDeleteUserMutation, useGetUsersQuery} from '../store/endpoints/usersEndpoints';
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {UserInfo} from "../utils/sliceHelpers.ts";

const UsersTable = () => {
    const {isLoading} = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const users = useAppSelector(state => state.users.users);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
    ) || [];

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        if (window.confirm(`Are you sure you want to delete this user with email: ${userEmail}?`)) {
            await deleteUser(userId).unwrap()
                .then(() => {
                  // Optionally, show success message
                })
                .catch((error) => console.error('Delete failed:', error));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error?.data || 'Failed to fetch users'}</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Sub</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user: UserInfo) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.subscribed ? 'Yes' : 'No'}</td>
                        <td>
                            <button
                                onClick={() => handleDeleteUser(user.id, user.email)} className="deleteButton">❌
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
