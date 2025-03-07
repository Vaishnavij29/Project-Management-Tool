import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Project Management Tool</h1>
      <p>Manage your projects efficiently.</p>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <br/>
      
    
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Home;

    