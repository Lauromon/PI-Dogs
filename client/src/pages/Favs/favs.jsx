import DogCard from "../../components/dogCard/dogCard";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from "../../redux/actions/actions";
import Random from "../../components/random/random";
import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'
import './favs.css'

const Favs = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.dogFavorites)
  const removeDogFavorite = (id) => {
    dispatch(removeFavorite(id))
  }
  return (
    <div className="favContainer">
      <nav className="favNav">
        <ul className="favLinks">
          <li>
            <Link to="/create" >Create Dog</Link>
          </li>
          <li>
            <Link to="/home" >Home</Link>
          </li>
        </ul>
        <div className="rnd">
          <Random />
        </div>
        <h1>Love Wall</h1>
      </nav>
      
        <div className="favDogContainer">
            {favorites.length ? favorites.map(dog =>
              <div className="favDogs">
                <DogCard
                  id={dog.id}
                  name={dog.name}
                  image={dog.image}
                  weight={dog.weight}
                  temperaments={dog.temperament}
                />
                <button className="removeBtn" onClick={() => removeDogFavorite(dog.id)}>X</button>
                <br />
              </div>)
              :
              <div className="favNoDog">
                <h2> Hey, here will be the puppies you like the most</h2>
              </div>
            }
        </div>
    
      <div className="favFooter">
        <div className="favCredits">
          <ul>
            <li>
              <a className="lau" href="/about">Lautaro Orbes, 2022</a>
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
export default Favs