import React from 'react';

import './navbar.css';

export default function Navbar({selected, setSelected}) {
  const renderButton = (text, idx) => {
    let isSelected = idx === selected;
    let styling = isSelected ? 'nav-btn nav-selected' : 'nav-btn';
    return (
      <button onClick={() => setSelected(idx)} className={styling}>
        {text}
      </button>
    );
  };

  return (
    <div className="navbar">
      {['RPS', 'Kuhn Poker', 'MW Kuhn', `Leduc Hold'em`].map(renderButton)}
    </div>
  );
}
