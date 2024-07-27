/*
import React from "react";
import dataimplementcard from "../data/dataimplementcard";
const ImplementCard = () => {
  return (
    <div className="implement-card">

      {dataimplementcard.map(({ name, image, id, quantity, description }) => {
        return (

            <div key={id} className="box">
              <div className="card">

                <div className="image">
                  <img src={image} alt="pelota" />
                </div>
                <div className="description">
                  <h1>{name}</h1>
                  <p>ID: {id}</p>
                  <p>Cantidad: {quantity}</p>
                  <p>{description}</p>
                </div>

              </div>

              <button className="button">Pedir</button>

            </div>
        );
      })}
    </div>
  )
}

export default ImplementCard;
*/


import React from 'react';
import getImplements from '../services/implements.service.js';
const ImplementCard = ({ data= {} }) => {
  return (
    <div className="implement-card">
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
      <h1>{data.name}</h1>
      <h1>{data._id}</h1>

    </div>
  );
};

export default ImplementCard;

