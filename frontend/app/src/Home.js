import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-6xl">StudyTracer</h1>
      <p className="text-xl">Discordbotがあなたの学習時間を自動記録します</p>
      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700">使ってみる</button>
        <button className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700">説明を読む</button>
      </div>
    </div>
  );
}

export default Home;
