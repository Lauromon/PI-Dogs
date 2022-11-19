import React from "react";
import { useSelector } from "react-redux";
import './filter.css'

export default function Filters(handleFilterFrom, handleFilterTemp) {
    const temperamentsState = useSelector(s => s.temperaments)
   
    return (
      <div className="container-filtros">
        <div className="fields">
          <select className="fieldTemp" defaultValue='default' onChange={e=> handleFilterTemp(e)}>
            <option value="default" disabled>Temperament:</option>
            <option key={0} value="all">All</option>

            { temperamentsState.length ? temperamentsState.map(t => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))
            : null }

          </select>

        
          <select  defaultValue='default' onChange={ e=> handleFilterFrom(e)}>
            <option value="default" disabled>Creation:</option>
            <option value="all">All dogs</option>
            <option value="Created">Created</option>
            <option value="API">API</option>
          </select>
        </div>
      </div>
  );
}