import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // ここでフォームのデータを処理します（例：APIに送信）
    console.log(name, email, message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        メールアドレス:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        メッセージ:
        <textarea value={message} onChange={e => setMessage(e.target.value)} required />
      </label>
      <input type="submit" value="送信" />
    </form>
  );
};

export default ContactForm;