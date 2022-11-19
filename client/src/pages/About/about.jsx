import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'
import { Link, useHistory } from "react-router-dom";
import './about.css';

const About = () => {
  const history = useHistory();
  const goHome = () => history.push('/home');

  return (
    <div className="about">
      
      <div className="aboutHome">
        <button onClick={goHome}>Check our page!</button>
      </div>

      <div className="aboutContent">
        <div className="aboutWrapper">
          <div className="firstAbout">
            <h1>About us</h1>
            <p>Here at Henry Dogs we know that you love puppies, so we make sure you know everything about your puppy.</p>
            <p>That is why we work with dedication to create an app where you can see all the information about them in a friendly and intuitive way.</p>
            <p>You can filter based on their temperaments, order them and even get a random dog.</p>
            <p>Maybe we forgot your favorite breed? Don't worry, you can also add new breeds, we are proud to provide a reliable database to users.</p>
          </div>

          <div className="secondAbout">
            <h1>Made with love.</h1>
            <p>This page is a work from Lautaro Orbes.</p>
            <p>Henry Dogs was born as a project of Henry's bootcamp to grow and become my own personal project</p>
            <p>Fonts used are Rubik, Montserrat and Fira Sans.</p>
            <p>Social networks and search icons are from flaticon. Landing video is from Pexels.</p>
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