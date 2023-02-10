import { Fragment } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useGlobalContext } from '../context';

function AllScientificName() {
  const { drugs } = useGlobalContext();
  console.log(drugs);
  return (
    <Fragment>
      <div style={{ backgroundColor: 'yellow' }}>
        <h3 style={{ textAlign: 'center' }}>
          under construction - تحت الانشاء{' '}
        </h3>
      </div>

      <div className="container">
        <List
          height={600}
          itemCount={drugs.length}
          itemData={drugs}
          itemSize={35}
          width={600}
        >
          {({ index, style, data }) => (
            <div style={style} className="card">
              {data[index].TradeName}
            </div>
          )}
        </List>
      </div>
    </Fragment>
  );
}

export default AllScientificName;
