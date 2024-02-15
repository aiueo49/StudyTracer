import React, { useState } from 'react';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-6xl">StudyTracer</h1>
      <p className="text-xl">Discordbotがあなたの学習時間を自動記録します</p>
      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700">使ってみる</button>
        <button
          className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={showModal}
        >
          説明を読む
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={hideModal}
          >
            <div
              className="bg-white p-4 rounded"
              onClick={(e) => e.stopPropagation()}  
            >
              <h2 className="text-2xl">StudyTracerとは</h2>
              <p>
                StudyTracerはDiscordのボイスチャンネルに接続しているユーザーの学習時間を自動で記録するDiscordbotです。
              </p>
              <button
                className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={hideModal}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
