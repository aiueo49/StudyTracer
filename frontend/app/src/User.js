import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  MyCalendar from './MyCalendar';

function User() {
  // 今日の日付を取得
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  // 今日の曜日を取得
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = week[today.getDay()];

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
      <div className='flex justify-between'>
        <div className='flex-1/2 flex flex-col items-center justify-center'>
          <h1>{user.name}</h1>
          <img src={user.avatar_url} alt={user.name} />
          <p>今までの合計学習時間: {studyTime.total_study_time} </p>
          <p>今日の合計学習時間: {studyTime.today_study_time}</p>
          <p>今週の合計学習時間: {studyTime.this_week_study_time}</p>
          <p>先週の合計学習時間: {studyTime.last_week_study_time}</p>
          <MyCalendar studyTime={studyTime} />
        </div>
        <div className='flex-1 border-l-2 border-dashed border-gray-400'>
          <h1>{dateString} ({dayOfWeek})</h1>
          <p>学習時間: {studyTime.today_study_time}</p>
          <p>学習内容: </p>
          <p>感想:</p>
        </div>
      </div>
    </>
  );
}

export default User;
