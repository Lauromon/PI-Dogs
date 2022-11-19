import DogCard from "../../components/dogCard/dogCard";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from "../../redux/actions/actions";
import Random from "../../components/random/random";
import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'

const Favs = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.dogFavorites)
  const removeDogFavorite = (id) => {
    dispatch(removeFavorite(id))
  }
  return (
    <div>
      <nav>
        <ul className="list">
          <li>
            <Link exact to="/create" >Create Dog</Link>
          </li>
          <li>
            <Link to="/home" >Home</Link>
          </li>
        </ul>
        <div>
            <Random />
          </div>
      </nav>
      <div>
        <h2>Love Wall</h2>
        <ul>
          {favorites.length ? favorites.map(dog =>
            <div>
              <DogCard
                id={dog.id}
                name={dog.name}
                image={dog.image}
                weight={dog.weight}
                temperaments={dog.temperament}
              />
              <button onClick={() => removeDogFavorite(dog.id)}>x</button>
              <br />
            </div>)
            :
            <div>
              <p> Hey, here will be the puppies you like the most</p>
            </div>
          }
        </ul>
      </div>
      <div className="aboutFooter">
        <div className="credits">
          <ul>
            <li>
              <a href="/about">Lautaro Orbes, 2022</a>
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