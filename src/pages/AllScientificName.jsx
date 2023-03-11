import { Fragment, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

function AllScientificName() {
  const { drugs } = useGlobalContext();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState();
  console.log(drugs);
  const data = drugs;
  const navigate = useNavigate();
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

  return (
    <Fragment>
      <div style={{ backgroundColor: 'yellow' }}>
        <h3 style={{ textAlign: 'center' }}>
          under construction - تحت الانشاء{' '}
        </h3>
      </div>
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
                className="ScientificName"
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
