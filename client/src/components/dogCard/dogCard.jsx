import './dogCard.css'
import React from "react";
import { Link } from "react-router-dom";




export default function DogCard({ id, name, image, weight, temperament }) {
  
  return (
    <div className="container">
      <Link className="card" to={`/detail/${id}`} style={{ textDecoration: 'none' }}>

        <div className="wrapperImg">
          <img className="imgDog" src={image} alt={name} />
        </div>

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

