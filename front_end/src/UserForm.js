import { useState } from 'react';
import { createUser, updateUser } from './api';

function UserForm ({ onFormSubmitSuccess, editingUserId }) {
  const [user, setUser] = useState({name: '', userIds: []})
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingUserId) {
      editUserFromForm(user)
    } else {
      createUserFromForm(user)
    }
  }

  const createUserFromForm = async (user) => {
    try {
      await createUser(user)
      setUser({ name: '', userIds: [] });
      onFormSubmitSuccess();
    } catch (error) {
      setError('Error creating user');
      console.error('handleSubmit', error)
    }
  };

  const editUserFromForm = async (user) => {
    try {
      await updateUser(editingUserId, user)
      setUser({ name: '', userIds: [] });
      onFormSubmitSuccess();
    } catch (error) {
      setError('Error updating user');
      console.error('handleSubmit', error)
    }
  };

  return (
    <div className="form-container">
      <h2>{editingUserId ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit} method={editingUserId ? "PUT" : "POST"}>
        {editingUserId &&
          <div>
            <label htmlFor='id'>ID</label>
            <input type='text' name='id' disabled={true} value={editingUserId} />
          </div>
        }
        <div>
          <label htmlFor='name'>Name*</label>
          <input type='text' id='name' name='name' value={user.name} required={true} onChange={handleChange} />
        </div>
        <button className="form-submit-btn" type='submit'>{editingUserId ? "Update" : "Create" }</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default UserForm;
