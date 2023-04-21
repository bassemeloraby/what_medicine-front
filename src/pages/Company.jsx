import React, { Fragment } from 'react';

import AddCompany from '../components/AddCompany';
import { useGlobalContext } from '../context';
import axios from 'axios';
import Loading from '../components/Loading';
const URL = 'http://localhost:5000/api/companies';

const Company = () => {
  const [company, setCompany] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [updateState, setUpdateState] = React.useState('');
  const { adminOpen } = useGlobalContext();

  const [companyName, setCompanyName] = React.useState('');

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
  // add company
  const updateCompany = async (comp) => {
    console.log(comp)
    const res = await axios.put(`${URL}/${updateState}`, comp);

    const newCompany = res.data;
    console.log(newCompany);
    // setCompany([...company, newCompany]);
  };

  //delete company
  function deleteCompany(_id) {
    axios.delete(`${URL}/${_id}`);
    const newList = company.filter((comp) => comp._id !== _id);
    setCompany(newList);
  }

  // update company
  const editHandler = (_id) => {
    console.log(_id);
    setUpdateState(_id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!companyName) {
      alert('Please add a company name');
      return;
    }
    updateCompany({ companyName});

    setCompanyName('');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <section className="container">
        <div className="company-header">
          <h2 className="company-title">Company </h2>
          {adminOpen ? (
            <span>number of companies: {company.length} - Company.jsx</span>
          ) : (
            ''
          )}
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
            <form onSubmit={onSubmit}>
              <table className="company-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Website</th>
                    {adminOpen ? (
                      <Fragment>
                        <th>Delete</th>
                        <th>Update</th>
                      </Fragment>
                    ) : (
                      ''
                    )}
                  </tr>
                </thead>
                <tbody>
                  {company
                    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                    .map((comp) =>
                      updateState === comp._id ? (
                        <tr key={comp._id}>
                          <td>
                            <input
                              name="text"
                              value={companyName}
                              autoComplete="off"
                              onChange={(e) => setCompanyName(e.target.value)}
                            ></input>
                          </td>
                          <td>
                            <a
                              href={comp.website}
                              rel="noreferrer"
                              target="_blank"
                              style={{ textDecoration: 'underline' }}
                            >
                              {comp.website}
                            </a>
                          </td>
                          {adminOpen ? (
                            <Fragment>
                              <td>
                                <button
                                  className="update"
                                  type="submit"
                                  // onClick={() => updateHandler(comp._id)}
                                >
                                  update
                                </button>
                              </td>
                            </Fragment>
                          ) : (
                            ''
                          )}
                        </tr>
                      ) : (
                        <tr key={comp._id}>
                          <td>
                            <h3>{comp.companyName}</h3>
                          </td>
                          <td>
                            <a
                              href={comp.website}
                              rel="noreferrer"
                              target="_blank"
                              style={{ textDecoration: 'underline' }}
                            >
                              {comp.website}
                            </a>
                          </td>
                          {adminOpen ? (
                            <Fragment>
                              <td>
                                <button
                                  className="delete"
                                  type="button"
                                  onClick={() => deleteCompany(comp._id)}
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <button
                                  className="edit"
                                  type="button"
                                  onClick={() => editHandler(comp._id)}
                                >
                                  edit
                                </button>
                              </td>
                            </Fragment>
                          ) : (
                            ''
                          )}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </form>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default Company;
