import React, { useState } from 'react';
import Modal from './Modal';

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className="text-center bg-discordPurple p-4 text-white">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li><a href="/terms" onClick={handleOpenModal} className="text-white">利用規約</a></li>
          <li><a href="/privacy" className="text-white">プライバシーポリシー</a></li>
          <li><a href="/contact" className="text-white">お問い合わせ</a></li>
        </ul>
      </nav>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>利用規約</h2>
        <p>ここに利用規約を記載します</p>
      </Modal>
      <p className="mt-12">© 2024 StudyTracer</p>
    </footer>
  );
};

export default Footer;