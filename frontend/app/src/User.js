import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { userID } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/users/${userID}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userID]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default User;
