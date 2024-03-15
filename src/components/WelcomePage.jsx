import React from 'react';
import NClogo from '../images/NC-logo.jpg'

const WelcomePage = () => {
  return (
    <div>
      <header>
        <h2>Welcome to NC News!</h2>
      </header>
      <main>
        <p></p>
        <img src={NClogo} alt="Placeholder" />
      </main>
    </div>
  );
}

export default WelcomePage;