import React, {  Fragment } from 'react';
import { useGlobalContext } from '../context';
import { useParams, Link } from 'react-router-dom';
function ScientificName() {
  const { drugs } = useGlobalContext();
  const { ScientificName } = useParams();
  return (
    <Fragment>
      <div className="drugs"><h2>{ScientificName}</h2></div>
      <div className='underline'></div>
      <Link to="/medicine" className="btn btn-primary">
        back to medicine list
      </Link>
      {drugs
        .filter((drug) => drug.ScientificName === ScientificName)
        .map((drug) => {
          return (
            <div className="card" key={drug._id}>
              <div className="TradeName"> {drug.TradeName}</div>
              <div className="PublicPrice">{drug.PublicPrice} SR</div>
              <div className="ScientificName">{drug.ScientificName}</div>
            </div>
          );
        })}
    </Fragment>
  );
}

export default ScientificName;
