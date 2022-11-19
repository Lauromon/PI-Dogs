import React, { useEffect, useState } from "react";
import { getById, deleteDog, addFavorite, getDogs } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import UpdateForm from "../../components/form/updateForm";
import Random from "../../components/random/random";
import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'

export default function DogDetail() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.details);
  const [update, setUpdater] = useState(false);

  const handleDelete = async () => {
    dispatch(deleteDog(id))
    .then(res => alert(res.payload));
    history.push("/home")
  }

  const handleClick = (dog) => {
    dispatch(addFavorite(dog))
  }

  const handleUpdate = () => {
    setUpdater(true);
  }

  useEffect(() => {
    dispatch(getById(id));
    dispatch(getDogs());
  }, [dispatch, id, update]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/create" >Create Dog</Link>
          </li>
          <li>
            <Link to="/home" >Home</Link>
          </li>
          <li>
            <Link to="/favs" >Favoritas</Link>
          </li>
        </ul>

        <div>
          <Random />
        </div>
      </nav>
      {Object.keys(details).length && details.id == id ? <div>
        <div>
          <img src={details.image} alt={details.name} />
        </div>
        <div>
          <h1>{details.name}</h1>
        </div>
        <div>
          <span>Weight:</span><p>{details.weight} Kg</p>
          <span>Height:</span><p>{details.height} Cm</p>
          <span>Life span:</span><p>{details.life_span}</p>
          <span>Temperaments:</span><p>{details.temperament}</p>
          <button onClick={() => handleClick(details)}>Add to favorites</button>
        </div>
      </div> : <p>There is no dog to see</p>}

      {(typeof details.id === 'string') ? details.id.includes("-") &&
        <div >
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div> : null}

      {update && <div className="updaterWindow">
        <UpdateForm id={details.id} setUpdater={setUpdater} />
      </div>}
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