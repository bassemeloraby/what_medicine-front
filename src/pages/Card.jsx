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
    <section className="">
      {drugs
        .filter((drug) => drug._id === _id)
        .map((drug) => {
          return (
            <section className="section-card cocktail-section" key={drug._id}>
              <Link to="/medicine" className="btn btn-primary">
                back to medicine list
              </Link>
              <h2 className="section-title">{drug.TradeName}</h2>
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
                    <span className="drink-data">Scientific Name :</span>{' '}
                    {drug.ScientificName}
                  </p>
                  <p>
                    <span className="drink-data">DrugType :</span>{' '}
                    {drug.DrugType}
                  </p>
                  <p>
                    <span className="drink-data">Strength :</span> {drug.Strength}
                  </p>
                  <p>
                    <span className="drink-data">Strength Unit :</span> {drug.StrengthUnit}
                  </p>
                  <p>
                    <span className="drink-data">Pharmaceutical Form :</span>{' '}
                    {drug.PharmaceuticalForm}
                  </p>
                  <p>
                    <span className="drink-data">Administration Route :</span>{' '}
                    {drug.AdministrationRoute}
                  </p>
                  <p>
                    <span className="drink-data">Size :</span>{' '}
                    {drug.Size}
                  </p>
                  <p>
                    <span className="drink-data">Size Unit :</span>{' '}
                    {drug.SizeUnit}
                  </p>
                  <p>
                    <span className="drink-data">Package Types :</span>{' '}
                    {drug.PackageTypes}
                  </p>
                  <p>
                    <span className="drink-data">Package Size :</span>{' '}
                    {drug.PackageSize}
                  </p>
                  <p>
                    <span className="drink-data">LegalStatus :</span>{' '}
                    {drug.LegalStatus}
                  </p>
                  <p>
                    <span className="drink-data">DistributeArea :</span>{' '}
                    {drug.DistributeArea}
                  </p>
                  <p>
                    <span className="drink-data">PublicPrice :</span>{' '}
                    {drug.PublicPrice}
                  </p>
                  <p>
                    <span className="drink-data">ShelfLife :</span>{' '}
                    {drug.ShelfLife}
                  </p>
                  <p>
                    <span className="drink-data">Marketing Company :</span>{' '}
                    {drug.MarketingCompany}
                  </p>
                  <p>
                    <span className="drink-data">MarketingCountry :</span>{' '}
                    {drug.MarketingCountry}
                  </p>
                  <p>
                    <span className="drink-data">ManufactureName :</span>{' '}
                    {drug.ManufactureName}
                  </p>
                  <p>
                    <span className="drink-data">ManufactureCountry :</span>{' '}
                    {drug.ManufactureCountry}
                  </p>
                  <p>
                    <span className="drink-data">MainAgent :</span>{' '}
                    {drug.MainAgent}
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
