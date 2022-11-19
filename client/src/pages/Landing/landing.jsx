import React from 'react'
import Video from '../../assets/landingVideo.mp4';
import { Link } from 'react-router-dom';
import './landing.css';

const LandingPage = () => {

  return (
    <div className="landing">

      <video autoPlay muted loop id="myVideo">
        <source src={Video} type="video/mp4"></source>
      </video>

      <div className="landingText">
        <span className="landingName">Dear Puppies</span>
        <div className="landingWrapper">
          <h1 className="landingTitle">What are you waiting for?</h1>
          <p>We know you love dogs, so here we put all of them together in one place to your pleasure </p>

          <div className="landingLinks">
            <Link className="landingButton" to="/home">
              <button>Enjoy</button>
            </Link>
            <Link className="landingButton2" to="/about">
              <button>About us</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );

};

export default LandingPage;