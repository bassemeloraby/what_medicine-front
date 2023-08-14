
import React, { Fragment } from 'react';
import vit from "../images/vit.jpg";

function  FoodSupplement() {
  return (
    <Fragment>
    <div className="container">
    <section className="home">
        <section className="home-header">
          <h2 className="">Welcome to my FoodSupplement</h2>
        </section>
        

      </section>
      <div className="d-flex justify-content-center">
            {" "}
            <img src={vit} alt="insurance"></img>
          </div>
    </div>
      
    </Fragment>
  );
}

export default FoodSupplement;
