import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {categotyData} from '../data'

const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';

function AddProducts({ onAdd }) {
  const [comp, setComp] = useState([]);
 

  const [formData, setFormData] = useState({
    company: '',
    productName: '',
    photo: '',
    category: '',
    age: '',
  });

  const { company, productName, photo, category, age } = formData;
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
    if (!company || !productName || !photo || !category || !age) {
      alert('Please add all fields');
      return;
    }
    onAdd({ company, productName, photo, category, age });
    console.log(productName);
    // setCompany('');
    // setProductName('');
    // setPhoto('');
    setFormData({
      company: '',
      productName: '',
      photo: '',
      category: '',
      age: '',
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
        {/*select name of category*/}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a category"
            type="text"
            name="category"
            autoComplete="off"
            list="data-category"
            onChange={onChange}
            value={category}
            // value={formData.company}
          />
        </InputGroup>
        <datalist id="data-category">
          {categotyData.map((c)=><option>{c.name}</option>)}
        </datalist>
        {/*select age*/}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a Age"
            type="text"
            name="age"
            autoComplete="off"
            list="data-age"
            onChange={onChange}
            value={age}
            // value={formData.company}
          />
        </InputGroup>
        <datalist id="data-age">
          <option>Children</option>
          <option>Adult</option>
          <option>All except premature infants</option>
          <option>All</option>
          
        </datalist>
        <Button variant="primary" type="submit" value="Save Company">
          Add
        </Button>{' '}
      </Form>
    </React.Fragment>
  );
}

export default AddProducts;
