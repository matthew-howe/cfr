import React from 'react'

import './navbar.css';

export default function Navbar() {

  const renderButton = text => {
    return <button className="nav-btn">{text}</button>
  }

  return (
    <div className="navbar">
      {['RPS', 'Kuhn Poker', 'MW Kuhn', `Leduc Hold'em`].map(renderButton)}
    </div>
  )
}
