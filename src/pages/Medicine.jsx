import React, { useState, useEffect, Fragment } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { VariableSizeList as List } from 'react-window';
import  AutoSizer  from 'react-virtualized-auto-sizer';

function Medicine() {
  const { drugs } = useGlobalContext();
  const data = drugs;

  const isGroup = (index) => {
    return index === 0 || data[index]?.type !== data[index - 1]?.type;
  };

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState();
  const navigate = useNavigate();
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
  return (
    <Fragment>
      <div className="container">
        <h1 className="drugs">{drugs.length} Items</h1>
        
        <section className="section-input">
          <input
            onChange={(e) => handleOnChange(e.target.value)}
            className="input-medicine"
          />
        </section>

        <div style={{ width: '100%', height: '100vh' }}>
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
                        {' '}
                        {data[index].TradeName}
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
        </div>
      </div>
    </Fragment>
  );
}

export default Medicine;
