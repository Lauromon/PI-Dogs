import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from '../../redux/actions/actions';
import './random.css';

export default function Random() {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const ids = Array.isArray(dogs) && dogs.map(d => d.id);
  let randomID = ids[Math.floor(Math.random() * ids.length)];

  useEffect(() => {
    !dogs.length && dispatch(getDogs)
  }, [dispatch]);

  return (
    <div>
      <Link to={`/detail/${randomID}`}>
        <button>Random Dog</button>
      </Link>
    </div>
  )
}