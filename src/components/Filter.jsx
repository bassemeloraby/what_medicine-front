
import { useState } from 'react';
function Filter({filtration}) {
    const [filter ,setFilter] =useState()
    const filterHandeler = (e) => {
        const name = e.target.value;
        console.log(name);
        setFilter(name)
        filtration(name)
       
      };
  return (
    <div className="search1">
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={filterHandeler}
        ></input>
      </div>
  )
}

export default Filter