import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ここでフォームのデータを処理します（例：APIに送信）
    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-10 rounded-lg">
      <h1 className="text-4xl mb-6 text-center">お問い合わせ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">名前:</span>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">メールアドレス:</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">メッセージ:</span>
          <textarea value={message} onChange={e => setMessage(e.target.value)} required 
            className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <input type="submit" value="送信" 
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>
    </div>
  );
};

export default ContactForm;