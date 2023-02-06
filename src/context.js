import React, { useState, useContext, useEffect } from 'react';

import Loading from './components/Loading';
import axios from 'axios';

const url = 'http://localhost:5000/api/drugs';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}`);
      setLoading(false);
      setDrugs(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDrugs();
  }, []);
  if (loading) {
    return <Loading/>
  }

  

  return (
    <AppContext.Provider
      value={{
        drugs,
        setDrugs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
