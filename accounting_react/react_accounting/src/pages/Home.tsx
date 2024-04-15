import React from 'react';
import '../css/home.css';

const Home = (props: { name: string; user_type: string }) => {
  if (props.user_type === 'Accountant') {
    return (
      <div className="home-container">
        <div className="home-wrapper">
          <h2 className="home-title">Welcome home {props.name}</h2>
        </div>
      </div>
    );
  } else {
    return <p className="access-denied">Access denied!!!</p>;
  }
};

export default Home;