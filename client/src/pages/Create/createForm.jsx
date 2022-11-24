import React, { useState, useEffect } from 'react';
import { createDog, getTemperaments, getDogs } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { validate } from '../../components/form/validateCreate';
import { Link, useHistory } from 'react-router-dom';
import GitHub from '../../assets/github.png'
import LinkedIn from '../../assets/linkedin.png'
import './createForm.css'

export default function CreateForm() {
  const history = useHistory();
  const stateTemperaments = useSelector(s => s.temperaments)
  const dispatch = useDispatch()
  const [tempSelected, setTemp] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    minWeight: '',
    maxWeight: '',
    minHeight: '',
    maxHeight: '',
    image: '',
    minLifeSpan: '',
    maxLifeSpan: '',
    temperament: []
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelect = (e) => {
    (!tempSelected.includes(e.target.value) && tempSelected.length < 6) && setTemp([...tempSelected, e.target.value]);
    if (tempSelected.length === 6) alert("You can only pick up to six temperaments.")
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setTemp(tempSelected.filter(t => t !== e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!errors.name && !errors.minWeight && !errors.maxWeight && !errors.minHeight
      && !errors.maxHeight && !errors.minLifeSpan && !errors.maxLifeSpan) {

      const newDog = {
        ...input,
        name: input.name.trim(),
        image: input.image.length ? input.image.trim() : null,
        temperament: tempSelected,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        life_span: `${input.minLifeSpan} - ${input.maxLifeSpan} years`
      };

      dispatch(createDog(newDog))
        .then(res => alert(res.payload))

      setTemp([]);
      setInput({
        name: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        image: '',
        minLifeSpan: '',
        maxLifeSpan: '',
        temperament: []
      });
      dispatch(getDogs())
      history.push('/home')
    }
  };

  return (
    <div className="containerCreator">

      <nav className="creatorNav">
        <div className='creatorLinks'>
        <ul>
          <li>
            <Link to="/home" >Home</Link>
          </li>
          <li>
            <Link to="/favs" >Love Wall</Link>
          </li>
        </ul>
        </div>
      </nav>

      <div className="creatorMenu">
        <h1 className="creatorTitle">Submit a Breed</h1>
        <div className="allFields">
          <form onSubmit={handleSubmit}>
            <div className='divForm'>
              <input placeholder='Name' className={errors.name && 'danger'} type='text' name='name' autoComplete="off" onChange={handleInputChange} value={input.name} />
              {errors.name && (<p className="danger">{errors.name}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Min weight' className={errors.minWeight && 'danger'} type="text" name='minWeight' autoComplete="off" onChange={handleInputChange} value={input.minWeight} />
              {errors.minWeight && (<p className="danger">{errors.minWeight}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Max weight' className={errors.maxWeight && 'danger'} type='text' name='maxWeight' autoComplete="off" onChange={handleInputChange} value={input.maxWeight} />
              {errors.maxWeight && (<p className="danger">{errors.maxWeight}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Min height' className={errors.minHeight && 'danger'} type='text' name='minHeight' autoComplete="off" onChange={handleInputChange} value={input.minHeight} />
              {errors.minHeight && (<p className="danger">{errors.minHeight}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Max height' className={errors.maxHeight && 'danger'} type='text' name='maxHeight' autoComplete="off" onChange={handleInputChange} value={input.maxHeight} />
              {errors.maxHeight && (<p className="danger">{errors.maxHeight}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Min life span' className={errors.minLifeSpan && 'danger'} type='text' name='minLifeSpan' autoComplete="off" onChange={handleInputChange} value={input.minLifeSpan} />
              {errors.minLifeSpan && (<p className="danger">{errors.minLifeSpan}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Max life span' className={errors.maxLifeSpan && 'danger'} type='text' name='maxLifeSpan' autoComplete="off" onChange={handleInputChange} value={input.maxLifeSpan} />
              {errors.maxLifeSpan && (<p className="danger">{errors.maxLifeSpan}</p>)}
            </div>

            <div className='divForm'>
              <input placeholder='Image url' className='inputImage' type='text' name='image' onChange={handleInputChange} autoComplete="off" value={input.image} />
            </div>

            <div className='tempWrap'>
              <select onChange={handleSelect} defaultValue='default'>
                <option value="default" disabled> Temperaments </option>
                {stateTemperaments.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            </div>

            <ul className="selectedTemps">
              {tempSelected.map((temp) => (
                <li className="selTempItem">
                  <button className="deleteSelectedTemp" value={temp} onClick={e => handleDelete(e)}>x</button>
                  {temp}
                </li>
              ))}
            </ul>

            {!Object.keys(errors).length && input.name.length > 0? (
              <div className='inputWrap'>
                <input type="submit" />
              </div>
            ): null}

          </form>
        </div>
      </div>

      <div className="creatorFooter">
        <div className="footCredits">
          <ul>
            <li>
              <a className='lau' href="/about">Lautaro Orbes, 2022</a>
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
  )
}
