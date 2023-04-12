import { Fragment, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const url = 'https://sore-lime-goat-tam.cyclic.app/api/drugs';

function AllScientificName() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState();
  console.log(drugs);
  const data = drugs;
  const navigate = useNavigate();

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



  const ScientificNameHndeler = (ScientificName) => {
    console.log(ScientificName);
    navigate(`/ScientificName/${ScientificName}`);
  };

  const handleOnChange = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    if (!query) setItems(data);
    setItems((_) =>
      data.filter((x) =>
        x.TradeName.toLowerCase().includes(query?.toLowerCase())
      )
    );
  }, [query, data]);

  if (loading) {
    return <Loading/>
  }

  return (
    <Fragment>
      <section className="section-input">
        <input
          onChange={(e) => handleOnChange(e.target.value)}
          className="input-medicine"
          placeholder="Search by Scientific Name"
        />
      </section>
      <div className="container">
        <List
          height={600}
          itemCount={items.length}
          itemData={items}
          itemSize={35}
          width={'100%'}
        >
          {({ index, style, data }) => (
            <div style={style} className="card">
              <div
                onClick={() =>
                  ScientificNameHndeler(data[index].ScientificName)
                }
                className="ScientificName Scientific-display"
                style={{ width: '100%' }}
              >
                {data[index].ScientificName}
              </div>
            </div>
          )}
        </List>
      </div>
    </Fragment>
  );
}

export default AllScientificName;
