import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';

function AddProducts({ onAdd }) {
  const [comp, setComp] = React.useState([]);
  const [company, setCompany] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [photo, setPhoto] = React.useState('');

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!company || !productName || !photo) {
      alert('Please add all fields');
      return;
    }
    onAdd({ company, productName, photo });
    console.log(productName);
    setCompany('');
    setProductName('');
    setPhoto('');
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
            name="text"
            autoFocus
            autoComplete="off"
            list="data"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
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
            onChange={(e) => setProductName(e.target.value)}
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
            onChange={(e) => setPhoto(e.target.value)}
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
