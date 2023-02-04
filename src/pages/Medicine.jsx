import React, { useState, useEffect, Fragment } from 'react';
import { useGlobalContext } from '../context';
// import './style.css';
import { VariableSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import * as _ from 'lodash';

// let data = _.sortBy(
//   Array(500)
//     .fill(true)
//     .map(_ => ({
//       isActive: false,
//       name: Math.random()
//         .toString(30)
//         .substr(2),
//       type: Math.random()
//         .toString(30)
//         .substr(12)
//     })),
//   'type'
// );

// const data = [
//   {
//     item: 1,
//     name: 'Banana',
//     type: 'fruits'
//   },
//   {
//     item: 2,
//     name: 'Apple',
//     type: 'fruits'
//   },
//   {
//     item: 3,
//     name: 'Watermelon',
//     type: 'fruits'
//   },
//   {
//     item: 4,
//     name: 'Dog',
//     type: 'animals'
//   },
//   {
//     item: 5,
//     name: 'Cat',
//     type: 'animals'
//   },
//   {
//     item: 6,
//     name: 'Horse',
//     type: 'animals'
//   }
//   //...
// ];

// const isGroup = index => {
//   return index === 0 || data[index]?.type !== data[index - 1]?.type;
// };

function Medicine() {
  const { drugs, setDrugs } = useGlobalContext();
  const data = drugs;
  // [
  //     {
  //       item: 1,
  //       name: 'Banana',
  //       type: 'fruits'
  //     },
  //     {
  //       item: 2,
  //       name: 'Apple',
  //       type: 'fruits'
  //     },
  //     {
  //       item: 3,
  //       name: 'Watermelon',
  //       type: 'fruits'
  //     },
  //     {
  //       item: 4,
  //       name: 'Dog',
  //       type: 'animals'
  //     },
  //     {
  //       item: 5,
  //       name: 'Cat',
  //       type: 'animals'
  //     },
  //     {
  //       item: 6,
  //       name: 'Horse',
  //       type: 'animals'
  //     }
  //...
  //   ];

  const isGroup = (index) => {
    return index === 0 || data[index]?.type !== data[index - 1]?.type;
  };

  const [items, setItems] = useState([]);
  const [hoverIndex, setHoverIndex] = useState();
  const [query, setQuery] = useState();
  const handleOnClick = (index) => {
    setItems((p) => {
      let temp = p.concat();
      temp[index].isActive = !temp[index].isActive;
      return temp;
    });
  };
  const handleOnMouseOver = (index) => {
    setHoverIndex(index);
  };

  const handleOnChange = (value) => {
    setQuery(value);
  };
  useEffect(() => {
    if (!query) setItems(data);
    setItems((_) => data.filter((x) => x.TradeName.toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  useEffect(() => {
    setItems(data);
  }, []);

  function rowHeight({ index }) {
    return isGroup(index) ? 20 : 30; // Use your heights here
  }
  return (
    <Fragment>
      <input onChange={(e) => handleOnChange(e.target.value)} className='input-medicine' />
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
                    onMouseOver={() => handleOnMouseOver(index)}
                    onClick={() => handleOnClick(index)}
                    style={{
                      ...style,
                      //background: `${hoverIndex === index ? '#ccc' : ''}`
                    }}
                  >
                    <div
                      style={{
                        background: 'white',
                        background: `${hoverIndex === index ? '#ccc' : ''}`,
                      }}
                    >
                      {data[index].TradeName}.{' '}
                    </div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </Fragment>
  );
}

export default Medicine;
