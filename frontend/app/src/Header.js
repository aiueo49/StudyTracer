import React from 'react';

const Header = () => {
  return (
    <header className="text-center bg-discordPurple p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li><a href="/" className="text-white">Home</a></li>
          <li><a href="/about" className="text-white">About</a></li>
          <li><a href="/contact" className="text-white">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;