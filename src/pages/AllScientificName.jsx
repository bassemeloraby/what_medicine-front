import { FixedSizeList as List } from 'react-window';
import { useGlobalContext } from '../context';

function AllScientificName() {
  const { drugs } = useGlobalContext();
  console.log(drugs);
  return (
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
  );
}

export default AllScientificName;
