import React, { useState, useEffect } from 'react';
import { updateDog, getTemperaments, } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { validate } from './validateUpdate';

export default function UpdateForm({ id, setUpdater }) {
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
    
    if (!Object.keys(errors).length) {

      const updatedDog = {
        ...input,
        name: input.name.length ? input.name.trim() : null ,
        image: input.image.length ? input.image.trim() : null,
        temperament: tempSelected ? tempSelected : null,
        height: input.minHeight.length ? `${input.minHeight} - ${input.maxHeight}` : null,
        weight: input.minHeight.length ? `${input.minWeight} - ${input.maxWeight}` : null,
        life_span: input.minHeight.length ? `${input.minLifeSpan} - ${input.maxLifeSpan} years` : null
      };
      console.log(updatedDog,"entre al submit")
      dispatch(updateDog(id, updatedDog))
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
    }
  };

  const handleClose = () => {
    setUpdater(false);
  }

  return (
    <div>
      <button className="closeUpdater" onClick={handleClose}>X</button>
      <h1 className="updaterTitle">Update this Breed</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input className={errors.name && 'danger'} type='text' name='name' autoComplete="off" onChange={handleInputChange} value={input.name} />
          {errors.name && (<p className="danger">{errors.name}</p>)}
        </div>

        <div>
          <label>Min weight:</label>
          <input className={errors.minWeight && 'danger'} type="text" name='minWeight' autoComplete="off" onChange={handleInputChange} value={input.minWeight} />
          {errors.minWeight && (<p className="danger">{errors.minWeight}</p>)}
        </div>

        <div>
          <label>Max weight:</label>
          <input className={errors.maxWeight && 'danger'} type='text' name='maxWeight' autoComplete="off" onChange={handleInputChange} value={input.maxWeight} />
          {errors.maxWeight && (<p className="danger">{errors.maxWeight}</p>)}
        </div>

        <div>
          <label>Min height:</label>
          <input className={errors.minHeight && 'danger'} type='text' name='minHeight' autoComplete="off" onChange={handleInputChange} value={input.minHeight} />
          {errors.minHeight && (<p className="danger">{errors.minHeight}</p>)}
        </div>

        <div>
          <label>Max height:</label>
          <input className={errors.maxHeight && 'danger'} type='text' name='maxHeight' autoComplete="off" onChange={handleInputChange} value={input.maxHeight} />
          {errors.maxHeight && (<p className="danger">{errors.maxHeight}</p>)}
        </div>

        <div>
          <label>Min life span:</label>
          <input className={errors.minLifeSpan && 'danger'} type='text' name='minLifeSpan' autoComplete="off" onChange={handleInputChange} value={input.minLifeSpan} />
          {errors.minLifeSpan && (<p className="danger">{errors.minLifeSpan}</p>)}
        </div>

        <div>
          <label>Max life span:</label>
          <input className={errors.maxLifeSpan && 'danger'} type='text' name='maxLifeSpan' autoComplete="off" onChange={handleInputChange} value={input.maxLifeSpan} />
          {errors.maxLifeSpan && (<p className="danger">{errors.maxLifeSpan}</p>)}
        </div>

        <div>
          <label>Image:</label>
          <input className='inputImage' type='text' name='image' onChange={handleInputChange} autoComplete="off" value={input.image} />
        </div>

        <div>
          <label>Temperaments:</label>
          <select onChange={handleSelect}>
            <option value="temp"> Temperaments </option>
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

        {!Object.keys(errors).length && (
          <div>
            <input type="submit" />
          </div>
        )}

      </form>
    </div>
  )
}
