import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from 'axios';
import Loading from '../components/Loading';
import { useGlobalContext } from '../context';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const url = 'https://sore-lime-goat-tam.cyclic.app/api/drugs';

function Medicine() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState();
  const [copyTrade, setCopyTrade] = useState('');
  const { adminOpen } = useGlobalContext();

  const navigate = useNavigate();

  const data = drugs;

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

  const isGroup = (index) => {
    return index === 0 || data[index]?.type !== data[index - 1]?.type;
  };

  const handleOnClick = (index) => {
    setItems((p) => {
      let temp = p.concat();
      temp[index].isActive = !temp[index].isActive;
      return temp;
    });
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

  useEffect(() => {
    setItems(data);
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  const cardHndeler = (_id) => {
    console.log(_id);
    navigate(`/card/${_id}`);
  };
  const ScientificNameHndeler = (ScientificName) => {
    console.log(ScientificName);
    navigate(`/ScientificName/${ScientificName}`);
  };
  function rowHeight({ index }) {
    return isGroup(index) ? 20 : 30; // Use your heights here
  }
  const copyHandler = (TradeName) => {
    console.log(TradeName);
    setCopyTrade(TradeName);
    const clip = () => {
      navigator.clipboard.writeText(copyTrade);
    };
    clip();
  };
  return (
    <Fragment>
      <section className="container">
        {/*-------start medicine header----------*/}
        {/* navigate to company*/}
        <section className="">
          <Button
            variant="primary"
            onClick={() => navigate('/AllScientificName')}
          >
            search by Scientific Name
          </Button>{' '}
        </section>
        <div className="">
          <h2 className="text-center">Medicine by trade name </h2>
          <div className="underline"></div>
        </div>
        {/*-------end medicine header----------*/}
        {/*-------start medicine search----------*/}
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Trade Name"
            autoComplete="off"
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </InputGroup>
        {/*-------end medicine search----------*/}
        {/*-------start  medicine tarde name table----------*/}
       

        {/*-------end  medicine tarde name table----------*/}

        <section style={{ width: '100%', height: '100vh' }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                itemData={items}
                height={height}
                itemCount={items.length}
                itemSize={rowHeight}
                width={width}
              >

                {({ index, data, style }) => {
                  return (
                    <div
                      onClick={() => handleOnClick(index)}
                      style={{
                        ...style,
                      }}
                      className="card"
                    >
                      <div
                        className="TradeName"
                        onClick={() => cardHndeler(data[index]._id)}
                      >
                        {data[index].TradeName}
                      </div>
                      <div
                        className="PublicPrice"
                        onClick={() => copyHandler(data[index].TradeName)}
                      >
                        Copy
                      </div>
                      <div className="PublicPrice">
                        {data[index].PublicPrice} SR
                      </div>
                      <div
                        className="ScientificName"
                        onClick={() =>
                          ScientificNameHndeler(data[index].ScientificName)
                        }
                      >
                        {data[index].ScientificName}
                      </div>
                    </div>
                  );
                }}
              </List>
            )}
          </AutoSizer>
        </section>
      </section>
    </Fragment>
  );
}

export default Medicine;
