import React, { useState } from 'react';

export default function ShareButton() {
  const [name, setName] = useState('Share');

  const onClick = () => {
    navigator.clipboard
      .writeText(window.location.href.replace('/in-progress', ''))
      .then(() => {
        setName('Link copiado!');
      });
  };
  return (
    <button type="button" data-testid="share-btn" onClick={ onClick }>{name}</button>
  );
}
