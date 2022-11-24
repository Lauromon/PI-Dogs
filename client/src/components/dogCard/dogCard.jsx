import './dogCard.css'
import React from "react";
import { Link } from "react-router-dom";
import Heart from '../../assets/corazon.png'

export default function DogCard({ id, name, image, weight, temperament, handleClick, dog }) {
  
  return (
    <div className="container">

        <div className="wrapperImg">
      { typeof(handleClick) === 'function' && <div className='imgHolder'>
         <img title="Add to Love Wall" onClick={() => handleClick(dog)} src={Heart} alt="favs" />
      </div>}
          <img className="imgDog" src={image} alt={name} />
        </div>
      <Link className="card" to={`/detail/${id}`} style={{ textDecoration: 'none' }}>

        <div className="cardText">
          <h2 className="cardTitle">{name}</h2>
          <h4 className="cardSub">{weight} kg</h4>

          <div className="temp-wrapper">
            <p className="cardTemp">{temperament}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

