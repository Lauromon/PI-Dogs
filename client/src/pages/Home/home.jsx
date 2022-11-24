import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/pagination";
import DogCard from "../../components/dogCard/dogCard";
import { getDogs, getTemperaments, getByName, filterByTemperament, filterFrom, orderBy, addFavorite } from "../../redux/actions/actions";
import { Link } from 'react-router-dom';
import Random from '../../components/random/random';
import GitHub from '../../assets/github.png';
import LinkedIn from '../../assets/linkedin.png';
import Loader from '../../assets/Loader.gif'
import './home.css';


const HomePage = () => {
  const temperamentsState = useSelector(s => s.temperaments)
  const dogs = useSelector(state => state.dogs);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  

  const handleSort = (e) => {
    e.preventDefault()
    setPage(0)
    dispatch(orderBy(e.target.value))
  }

  const handleFilterFrom = (e) => {
    e.preventDefault()
    setPage(0)
    dispatch(filterFrom(e.target.value));
  }

  const handleFilterTemp = (e) => {
    e.preventDefault()
    dispatch(filterByTemperament(e.target.value));
  }

  const nextPage = () => {
    if (dogs.length > page + 8) setPage(page + 8)

  };

  const prevPage = () => {
    if (page > 0)
      setPage(page - 8)
  };

  let dogsPaginated;
  if (Array.isArray(dogs)) {
    dogsPaginated = dogs.slice(page, page + 8)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(search))
  }

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleClick = (dog) => {
    dispatch(addFavorite(dog))
    alert('Added to Love Wall!')
  }

  useEffect(() => {
    !dogs.length && dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch]);

  console.log(dogs, "perris");
  return (
    <div className="home">

      <nav className="nav">
        <div className="links">
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

        <div className="ordFilter">
          <div className="wrap1">
            <select defaultValue='default' onChange={handleSort} >
              <option value="default" disabled>Sort by:</option>
              <option key={0} value="asc">Name (A-Z)</option>
              <option key={1} value="desc">Name (Z-A)</option>
              <option key={2} value="lower">Weight (asc)</option>
              <option key={3} value="higher">Weight (desc)</option>
            </select>
          </div>

          <div className="wrap2">
            <select defaultValue='default' onChange={handleFilterTemp}>
              <option value="default" disabled>Temperament:</option>
              <option key={0} value="all">All</option>
              {temperamentsState.length ? temperamentsState.map(t => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))
                : null}
            </select>

            <select defaultValue='default' onChange={handleFilterFrom}>
              <option value="default" disabled>From:</option>
              <option value="all">All dogs</option>
              <option value="Created">Created</option>
              <option value="API">API</option>
            </select>
          </div>
        </div>
        <div className="rightNav">
          <div className="homeRnd">
            <Random />
          </div>
          <div className="search">
            <form onSubmit={handleSubmit}>
              <input className="searchInput" type="text" onChange={handleChange} value={search} placeholder='Search by name...' />
              <button className="searchBtn" type='submit'>Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="containerDogs">
        {Array.isArray(dogs) ? (dogsPaginated.length ? dogsPaginated.map(dog => {
          return (<div className="dogs">
            <DogCard
              id={dog.id}
              name={dog.name}
              image={dog.image}
              weight={dog.weight}
              temperament={dog.temperament}
              handleClick={handleClick}
              dog={dog}
            />
          </div>
          );
        }) : <div className="homeLoader"><img src={Loader} alt="Loading..." /></div>) : <div className="home404"><h2>{dogs.msg}</h2></div>}
        <div className="pagination">
          <Pagination nextpage={nextPage} prevPage={prevPage} />
        </div>
      </div>

      <div className="footer">
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
};

export default HomePage;