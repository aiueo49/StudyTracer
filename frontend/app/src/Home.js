import React, { useState } from 'react';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setPage(1); // Reset to first page when modal is closed
  };

  const nextPage = () => {
    setPage(page + 1);
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
              className="bg-white p-4 rounded w-3/4 h-3/4 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}  
            >
              {page === 1 && (
                <div>
                  {/* Content for page 1 */}
                  <h1 className="text-2xl text-left">
                    1. botをサーバーに招待しよう
                  </h1>
                </div>
              )}
              {page === 2 && (
                <div>
                  {/* Content for page 2 */}
                  <h1 className="text-2xl text-left">
                    2. 学習を開始しよう
                  </h1>
                </div>
              )}
              {page === 3 && (
                <div>
                  {/* Content for page 3 */}
                  <h1 className="text-2xl text-left">
                    3. 学習を終了しよう
                  </h1>
                </div>
              )}
              {page === 4 && (
                <div>
                  {/* Content for page 4 */}
                  <h1 className="text-2xl text-left">
                    4. 学習時間を確認しよう
                  </h1>
                </div>
              )}
              {/* Add more pages as needed */}
              <div className="flex flex-col space-y-1">
                {page < 4 && (
                  <button
                    className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={nextPage}
                  >
                    次へ
                  </button>
                )}
                <button
                  className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={hideModal}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;