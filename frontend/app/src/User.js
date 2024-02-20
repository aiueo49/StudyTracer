import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [studyTime, setStudyTime] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${userID}`)
      .then(response => response.json())
      .then(data => setUser(data));

    // 学習時間を取得
    fetch(`http://localhost:3001/study_times/${userID}`)
      .then(response => response.json())
      .then(data => setStudyTime(data.study_time));
  }, [userID]);

  if (!user || studyTime === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar_url} alt={user.name} />
      <p>合計学習時間: {studyTime} </p>
    </div>
  );
}

export default User;
