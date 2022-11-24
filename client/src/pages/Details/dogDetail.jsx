import React, { useEffect, useState } from "react";
import { getById, deleteDog, addFavorite, getDogs } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import UpdateForm from "../../components/form/updateForm";
import Random from "../../components/random/random";
import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'
import Heart from '../../assets/corazon.png'
import Loader from '../../assets/Loader.gif'
import './dogDetail.css'

export default function DogDetail() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  /* const dogs = useSelector(state => state.auxDogs) */
  const details = useSelector(state => state.details);
  const [update, setUpdater] = useState(false);

  const handleDelete = async () => {
    dispatch(deleteDog(id))
      .then(res => alert(res.payload));
    dispatch(getDogs())
    history.push("/home")
  }

  const handleClick = (dog) => {
    dispatch(addFavorite(dog))
    alert('Added to Love Wall!')
  }

  const handleUpdate = () => {
    setUpdater(true);
  }

  useEffect(() => {
    dispatch(getById(id));
    /* !dogs.length && (getDogs()); */
  }, [dispatch, id, update]);

  return (
    <div className="detail">
      <nav className="detNav">
        <div className="detLinks">
          <ul>
            <li>
              <Link to="/home" >Home</Link>
            </li>
            <li>
              <Link to="/create" >Create Dog</Link>
            </li>
            <li>
              <Link to="/favs" >Love Wall</Link>
            </li>
          </ul>
        </div>
        <div className="rightDetNav">
          <div className="randomDet">
            <Random />
          </div>

        </div>
      </nav>
      {Object.keys(details).length && typeof details !== "string" ? (<div className="detailBody">
        <div className="detVisual">
          <h1 className="detTitulo pseudoTitle1">{details.nombre}</h1>
          <img src={details.image} alt={details.name} />
        </div>

        <div className="detDescripcion">
          <div className="detText">
            <h1 className={(details.name?.length > 20) ? "detTituloGrande pseudoTitle2" : "detTitulo pseudoTitle2"}>{details.name}</h1>
            <div className="itemDet">
            <span className="detCat">Weight:</span><p className="holder">{details.weight} Kg</p>
            </div>
            <div className="itemDet">
            <span className="detCat">Height:</span><p className="holder">{details.height} Cm</p>
            </div>
            <div className="itemDet">
            <span className="detCat">Life span:</span><p className="holder">{details.life_span}</p>
            </div>
            <div className="detTemps">
              <div>
            <p className="temp">{details.temperament}</p>
              </div>
            </div>
            <div className='detHolder'>
            <a onClick={() => handleClick(details)}><img src={Heart} alt="favs"/></a>
            </div>
      {(typeof details.id === 'string') ? details.id.includes("-") &&
        <div className="buttonsWrapper" >
          <button className="updateButton" onClick={handleUpdate}>Update</button>
          <button className="deleteButton" onClick={handleDelete}>Delete</button>
        </div> : null}
          </div>

        </div>
      </div>) : (Array.isArray(details)
                    ? <div className="detLoader"><img src={Loader} alt="Loading..."/></div>
                    : <div className="det404">
                            <h1>{details}</h1>
                    </div>)}


      {update && <div className="updaterWindow">
        <UpdateForm id={details.id} setUpdater={setUpdater} />
      </div>}

      <div className="footerDet">
        <div className="credits">
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