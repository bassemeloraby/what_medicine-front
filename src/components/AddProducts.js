import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';

function AddProducts({ onAdd }) {
  const [comp, setComp] = useState([]);
  // const [company, setCompany] = React.useState('');
  // const [productName, setProductName] = React.useState('');
  // const [photo, setPhoto] = React.useState('');

  const [formData, setFormData] = useState({
    company: '',
    productName: '',
    photo: '',
  });

  const { company, productName, photo } = formData;
  //fetch company data from backend
  React.useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${URL}`);
        setComp(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!company || !productName || !photo) {
      alert('Please add all fields');
      return;
    }
    onAdd({ company, productName, photo });
    console.log(productName);
    // setCompany('');
    // setProductName('');
    // setPhoto('');
    setFormData({
      company: '',
      productName: '',
      photo: '',
    });
  };

  return (
    <React.Fragment>
      {/*---------------------------------------------------*/}
      <Form onSubmit={onSubmit}>
        {/*select name of company*/}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a company"
            type="text"
            name="company"
            autoFocus
            autoComplete="off"
            list="data"
            onChange={onChange}
            value={company}
            // value={formData.company}
          />
        </InputGroup>
        <datalist id="data">
          {comp.map((c) => (
            <option key={c._id} value={c.companyName}>
              {c.companyName}
            </option>
          ))}
        </datalist>
        {/*enter Product Name*/}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="productName"
            placeholder="Enter Product Name"
            value={productName}
            autoComplete="off"
            onChange={onChange}
          />
        </InputGroup>
        {/*Enter Product photo link*/}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="photo"
            placeholder="Enter Product image link"
            value={photo}
            autoComplete="off"
            onChange={onChange}
          />
        </InputGroup>
        <Button variant="primary" type="submit" value="Save Company">
          Add
        </Button>{' '}
      </Form>
    </React.Fragment>
  );
}

export default AddProducts;
