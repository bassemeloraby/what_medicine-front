import { Fragment, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

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
    return <Loading />;
  }

  return (
    <Fragment>
      <section className="container">
        {/*-------start AllScientific header----------*/}
        {/* navigate to medicine*/}
        <section className="">
          <Button variant="primary" onClick={() => navigate('/medicine')}>
            search by medicine trade Name
          </Button>{' '}
        </section>
        <div className="">
          <h2 className="text-center">Medicine by Scientific name</h2>
          <div className="underline"></div>
        </div>
        {/*-------end AllScientific header----------*/}
        {/*-------start Scientific search----------*/}
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Scientific Name"
            autoComplete="off"
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </InputGroup>
        {/*-------end Scientific search----------*/}

        <div className="">
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
      </section>
    </Fragment>
  );
}

export default AllScientificName;
