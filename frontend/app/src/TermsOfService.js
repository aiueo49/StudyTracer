// TermsOfService.js
import React, { useEffect, useState } from 'react';

const TermsOfService = () => {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    fetch('/TermsOfService.html')
      .then(response => response.text())
      .then(data => {
        setTerms(data);
      });
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: terms }} />
  );
};

export default TermsOfService;