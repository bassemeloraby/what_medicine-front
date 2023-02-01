import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import drugImge from './no photo.jpg';

const url = 'http://localhost:5000/api/drugs';
function Card() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  //fetch data
  useEffect(() => {
    const fetchOneDrug = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/${_id}`);
        setDrugs(res.data);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
    };

    fetchOneDrug();
  }, [_id]);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="section cocktail-section">
      {drugs
        .filter((drug) => drug._id === _id)
        .map((drug) => {
          return (
            <section className="section cocktail-section">
              <Link to="/drugs" className="btn btn-primary">
                back to drugs list
              </Link>
              <h2 className="section-title">{}</h2>
              <div className="drink">
                {drug.img ? (
                  <img src={drug.img} alt={drug.TradeName}></img>
                ) : (
                  <img src={drugImge} alt={drug.TradeName}></img>
                )}

                <div className="drink-info">
                  <p>
                    <span className="drink-data">name :</span> {drug.TradeName}
                  </p>
                  <p>
                    <span className="drink-data">category :</span>{' '}
                    {drug.TradeName}
                  </p>
                  <p>
                    <span className="drink-data">info :</span> {drug.TradeName}
                  </p>
                  <p>
                    <span className="drink-data">glass :</span> {drug.TradeName}
                  </p>
                  <p>
                    <span className="drink-data">instructons :</span>{' '}
                    {drug.TradeName}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
    </section>
  );
}

export default Card;
