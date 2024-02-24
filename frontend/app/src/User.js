import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Calendar from './Calendar';
import  MyCalendar from './DatePicker';

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
      .then(data => setStudyTime(data));
  }, [userID]);

  if (!user || studyTime === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>{user.name}</h1>
        <img src={user.avatar_url} alt={user.name} />
        <p>今までの合計学習時間: {studyTime.total_study_time} </p>
        <p>今日の合計学習時間: {studyTime.today_study_time}</p>
        <p>今週の合計学習時間: {studyTime.this_week_study_time}</p>
        <p>先週の合計学習時間: {studyTime.last_week_study_time}</p>
      </div>
      {/* <Calendar /> */}
      <MyCalendar studyTime={studyTime} />
    </>
  );
}

export default User;
