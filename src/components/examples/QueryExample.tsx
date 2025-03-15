import { useExampleRepo } from '../../repo';

interface User {
  id: number;
  name: string;
  email: string;
}

export function QueryExample() {
  // Use the user repository instead of direct API calls
  const {
    users,
    isLoading,
    error,
    createUser,
    isCreating
  } = useExampleRepo();

  const handleCreateUser = () => {
    createUser({
      name: 'New User',
      email: 'newuser@example.com',
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>

      <button
        onClick={handleCreateUser}
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create User'}
      </button>
    </div>
  );
}
