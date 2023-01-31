import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import drugImge from './no photo.jpg';

const url = 'http://localhost:5000/api/drugs';
function Card() {
  const [drugs, setDrugs] = useState([]);
  const { _id } = useParams();
  //fetch data
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${url}/${_id}`);
      setDrugs(res.data);
      console.log(res.data);
    };

    fetchPosts();
  }, [_id]);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Medicine</h2>
      {drugs
        .filter((drug) => drug._id === _id)
        .map((drug) => {
          return (
            <section className="grid-container" key={drug._id}>
              <h3 style={{ textAlign: 'center' }}>{drug.TradeName}</h3>
              <br />
              {drug.img ? (
                <img src={drug.img} alt="no" width={200} height={200} />
              ) : (
                <img src={drugImge} alt="no" width={200} height={200} />
              )}
            </section>
          );
        })}
    </div>
  );
}

export default Card;
