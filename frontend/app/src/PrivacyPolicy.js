import React, { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [privacy, setPrivacy] = useState('');

  useEffect(() => {
    fetch('/PrivacyPolicy.html')
      .then(response => response.text())
      .then(data => {
        setPrivacy(data);
      });
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: privacy }} />
  );
};

export default PrivacyPolicy;