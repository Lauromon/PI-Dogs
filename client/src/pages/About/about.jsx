import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'
import { useHistory } from "react-router-dom";
import './about.css';

const About = () => {
  const history = useHistory();
  const goHome = () => history.push('/home');

  return (
    <div className="about">

      <div className="aboutNav">
        <div className="aboutHome">
          <button onClick={goHome}>Check our page!</button>
        </div>
      </div>

      <div className="aboutContent">
        <div className="aboutWrapper">
          <div className="firstAbout">
          <h1>About us</h1>
             <p>We hope you enjoy your visit!</p>
             <p>Here at Dear Puppies we know you love dogs, so we make sure you know everything about your pup.</p>
             <p>That is why we work with dedication to create an app where you can see all the information about them</p>
             <p> in a friendly and intuitive way.</p>
             <p>You can filter based on their temperament, sort them, and even pick a dog at random.</p>
             <p>Maybe we forgot your favorite breed? Don't worry, you can add new races too!</p>
           </div>

           <div className="secondAbout">
             <h1>Made with love.</h1>
             <p>This page is the work of Lautaro Orbes.</p>
             <p>Dear Puppies was born as an assignment from Henry's bootcamp</p>
             <p>to become "my own project" and the first app I ever made</p>
             <p>Social media and search icons are from Flaticon. The landing video is from Pexels.</p>
            
          </div>
        </div>
      </div>

      <div className="aboutFooter">
        <div className="credits">
          <ul>
            <li>
              <p>Lautaro Orbes, 2022</p>
            </li>
            <li>
              <ul>
                <li>•</li>
              </ul>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/lautaro-orbes/"><img width="30" height="30" src={LinkedIn} alt="linkedin" /></a>
            </li>
            <li>
              <ul>
                <li>•</li>
              </ul>
            </li>
            <li>
              <a href="https://github.com/Lauromon"><img width="30" height="30" src={GitHub} alt="github" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;