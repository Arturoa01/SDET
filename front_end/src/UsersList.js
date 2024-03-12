import UserListItem from './UserListItem';

function UsersList({ users, deleteUserRecord, setEditingUserId }) {
  const userList = () => users.map((user) => (
    <UserListItem key={user.id} user={user} deleteUserRecord={deleteUserRecord} setEditingUserId={setEditingUserId} />
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quiz IDs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList()}
      </tbody>
    </table>
  );
}

export default UsersList;
