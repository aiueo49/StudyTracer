import React, { useState } from 'react';
import Modal from './Modal';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleOpenModal = (title, body) => {
    setModalContent({ title, body });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className="text-center bg-discordPurple p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li><button onClick={() => handleOpenModal(<TermsOfService />)} className="text-white">利用規約</button></li>
          <li><button onClick={() => handleOpenModal(<PrivacyPolicy />)} className="text-white">プライバシーポリシー</button></li>
          <li><button className="text-white">お問い合わせ</button></li>
        </ul>
      </nav>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{modalContent.title}</h2>
        <div>{modalContent.body}</div>
      </Modal>
      <p className="mt-12 text-white">© 2024 StudyTracer</p>
    </footer>
  );
};

export default Footer;