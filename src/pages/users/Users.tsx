import { useEffect, useState } from 'react';
import UserItem from './UserItem';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Realiza la petición GET al endpoint del backend.
    fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      credentials: 'include', // Permite el envío de cookies, incluyendo el JWT almacenado.
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidorr');
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Ocurrió un error al obtener los usuarios.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
  