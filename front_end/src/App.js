import { useState, useEffect } from 'react';
import './App.css';
import { fetchUsers, deleteUser } from './api';
import UserForm from './UserForm';
import UsersList from './UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const users = await fetchUsers();

      setUsers(users.users);
    } catch (error) {
      console.error('fetchAllUsers', error);
    }
  }

  // This could be handled in a safer way. Can you identify the potential issue?
  const deleteUserRecord = async (userId) => {
    try {
      await deleteUser(userId);
      const newUsers = users.filter((user) => user.id !== userId);

      setUsers(newUsers);
    } catch (error) {
      console.error('deleteUser', error);
    }
  };

  const onFormSubmitSuccess = () => {
    fetchAllUsers();
    setEditingUserId(null);
  };

  return (
    <div>
      <h1 className="app-header">User List App</h1>
      <div className="app-body">
        <UserForm onFormSubmitSuccess={onFormSubmitSuccess} editingUserId={editingUserId} />
        <UsersList users={users} deleteUserRecord={deleteUserRecord} setEditingUserId={setEditingUserId} />
      </div>
    </div>
  );
}

export default App;
