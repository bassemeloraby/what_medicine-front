import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading'
// import Drug from '../components/Drug';

import {
  List,
  AutoSizer,
  // CellMeasurer,
  // CellMeasurerCache,
} from 'react-virtualized';

import axios from 'axios';
const url = 'http://localhost:5000/api/drugs';
function Drugs() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  
  const fetchDrugs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${url}`);
      setLoading(false)
      setDrugs(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDrugs()
  }, [])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  const cardHndeler= (_id)=>{
    console.log(_id)
    navigate(`/card/${_id}`)
  }

  return (
    <div>
      <h1 className="drugs">Drugs : {drugs.length} Items</h1>
      <div className="card">
      <table ><thead><tr>
      <th style={{backgroundColor:"yellow"}}>Trade Name</th>
      <th style={{backgroundColor:"#cddc39",width:'50%'}}>Scientific Name</th>
      
    </tr></thead></table>
    </div>
      <div style={{ width: '100%', height: '100vh' }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={50}
              rowCount={drugs.length}
              rowRenderer={({ key, index, style, parent }) => {
                const drug = drugs[index];

                return (
                  <div key={key} style={style} className="card">
                    <table>
                    
                      <tbody><tr>
                      <td className="hover" onClick={()=>cardHndeler(drug._id)} ><h4>{drug.TradeName}</h4> </td>
                      <td>{drug.ScientificName}</td>
                    </tr></tbody>
                      
                    </table>
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default Drugs;
