const API_BASE_URL = 'http://localhost:5001/challenge-project/us-central1/api';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      options: {
        mode: 'no-cors',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('fetchUsers', error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      options: {
        mode: 'no-cors',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('createUser', error);
  }
};

export const updateUser = async (userId, userAttrs) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAttrs),
      options: {
        mode: 'no-cors',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('updateUser', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      options: {
        mode: 'no-cors',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('deleteUser', error);
  }
};
