import React, { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import AddCompany from '../components/AddCompany';
import { useGlobalContext } from '../context';
import axios from 'axios';
import Loading from '../components/Loading';
const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';

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
  }, [updateState]);

  // add company
  const addCompany = async (comp) => {
    const res = await axios.post(`${URL}`, comp);

    const newCompany = res.data;
    console.log(newCompany);
    setCompany([...company, newCompany]);
  };
  // add company
  const updateCompany = async (comp) => {
    console.log(comp);
    console.log(updateState)
    const res = await axios.put(`${URL}/${updateState}`, comp);

    const newCompany = res.data;
    console.log(newCompany);
    // setCompany([...company, newCompany]);
    setUpdateState('');
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
    updateCompany({ companyName });

    setCompanyName('');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <section className="container">
        {/*-------start company header----------*/}
        <div className="">
          <h2 className="text-center">Company </h2>
          <div className="underline"></div>
        </div>
        {/*-------end company header----------*/}

        {/*-------start company body-------*/}
        {/*-------start company form-------*/}
        <section className="row">
          {adminOpen && (
            <section className="col-3">
              <AddCompany onAdd={addCompany} />
            </section>
          )}
          {/*-------end company form-------*/}
          {/*-------start company show-------*/}
          <section className="col">
            <form onSubmit={onSubmit}>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ backgroundColor: 'orange' }}>
                    <th>Company</th>
                    <th>Website</th>
                    {adminOpen && (
                      <Fragment>
                        <th>Delete</th>
                        <th>Update</th>
                      </Fragment>
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
                            <InputGroup className="">
                              <Form.Control
                                name="text"
                                defaultValue={comp.companyName}
                                autoComplete="off"
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </InputGroup>
                          </td>
                          

                          {adminOpen && (
                            <Fragment>
                              <td>
                                <Button className="update" type="submit">
                                  update
                                </Button>
                              </td>
                            </Fragment>
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
                              {comp.companyName}
                            </a>
                          </td>
                          {adminOpen ? (
                            <Fragment>
                              <td>
                                <Button
                                  onClick={() => deleteCompany(comp._id)}
                                  variant="danger"
                                  size="sm"
                                >
                                  Delete
                                </Button>{' '}
                              </td>
                              <td>
                                <Button
                                  onClick={() => editHandler(comp._id)}
                                  variant="success"
                                  size="sm"
                                >
                                  Edit
                                </Button>{' '}
                              </td>
                            </Fragment>
                          ) : (
                            ''
                          )}
                        </tr>
                      )
                    )}
                </tbody>
              </Table>
            </form>
          </section>
          {/*-------end company show-------*/}
        </section>
        {/*-------end company body-------*/}
      </section>
    </React.Fragment>
  );
};

export default Company;
