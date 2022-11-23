import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from '../../redux/actions/actions';
import './random.css';

export default function Random() {
  const dogs = useSelector(state => state.auxDogs);
  const ids = Array.isArray(dogs) && dogs.map(d => d.id);
  let randomID = ids[Math.floor(Math.random() * ids.length)];


  return (
    <div>
      <Link to={`/detail/${randomID}`}>
        <button className="rndBut">Random Dog</button>
      </Link>
    </div>
  )
}