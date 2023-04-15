import React from 'react';

import AddCompany from '../components/AddCompany';
import { useGlobalContext } from '../context';
import axios from 'axios';
import Loading from '../components/Loading';
const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';

const Company = () => {
  const [company, setCompany] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { adminOpen } = useGlobalContext();

  //fetch company data from backend
  React.useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}`);
        setLoading(false);
        setCompany(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchCompany();
  }, []);

  // add company
  const addCompany = async (comp) => {
    const res = await axios.post(`${URL}`, comp);

    const newCompany = res.data;
    console.log(newCompany);
    setCompany([...company, newCompany]);
  };

  //delete company
  function deleteCompany(_id) {
    axios.delete(`${URL}/${_id}`);
    const newList = company.filter((comp) => comp._id !== _id);
    setCompany(newList);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <section className="container">
        <div className="company-header">
          <h2 className="company-title">Company </h2>
          {adminOpen ?<span>number of companies: {company.length} - Company.jsx</span>:""}
        </div>
        <section className={adminOpen ? 'product-main-login' : 'product-main'}>
          {adminOpen ? (
            <div
              className={
                adminOpen ? 'product-form container' : 'product-form-logout'
              }
            >
              <AddCompany onAdd={addCompany} />
            </div>
          ) : (
            ''
          )}
          <div>
            <table className="company-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Website</th>
                  {adminOpen ? <th>Delete</th> : ''}
                </tr>
              </thead>
              <tbody>
                {company.map((comp) => (
                  <tr key={comp._id}>
                    <td>{comp.companyName}</td>
                    <td>
                      <a href={comp.website} rel="noreferrer" target="_blank">
                        {comp.website}
                      </a>
                    </td>
                    {adminOpen ? (
                      <td>
                        <button
                          className="delete"
                          type="button"
                          onClick={() => deleteCompany(comp._id)}
                        >
                          Delete
                        </button>
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default Company;
