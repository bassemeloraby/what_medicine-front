import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const url = 'https://sore-lime-goat-tam.cyclic.app/api/drugs';

function ScientificName() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ScientificName } = useParams();

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}`);
      setLoading(false);
      setDrugs(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDrugs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <div className="drugs">
        <h2>{ScientificName}</h2>
      </div>
      <div className="underline"></div>
      <Link to="/medicine" className="btn btn-primary button-navigate">
        back to medicine list
      </Link>
      <Link to="/AllScientificName" className="btn btn-primary button-navigate">
        back to Scientific list
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
