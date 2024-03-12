function UserListItem({ user, deleteUserRecord, setEditingUserId }) {
  const quizIdsAsString = () => {
    return user.quizIds.join(', ');
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{quizIdsAsString()}</td>
      <td>
        <button onClick={() => setEditingUserId(user.id)}>Edit</button>
        <button onClick={() => deleteUserRecord(user.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default UserListItem;
