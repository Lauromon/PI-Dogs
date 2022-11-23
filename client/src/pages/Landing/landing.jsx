import React from 'react'
import Video from '../../assets/landingVideo.mp4';
import { Link } from 'react-router-dom';
import './landing.css';

const LandingPage = () => {

  return (
    <div className="landing">
      <div className="landingVideo">
        <video autoPlay muted loop id="myVideo">
          <source src={Video} type="video/mp4"></source>
        </video>
      </div>
      <div className="landingText">
        <div className="landingWrapper">
          <h1 className="landingName">Dear Puppies</h1>
          <h2 className="landingTitle">What are you waiting for?</h2>
          <p>We know you love dogs, so here we put all of them together in one place to your pleasure </p>

          <div className="landingLinks">
            <Link className="landingButton" to="/home">
              <button>Enjoy</button>
            </Link>
            <Link className="landingAbout" to="/about">
              <button>About us</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );

};

export default LandingPage;