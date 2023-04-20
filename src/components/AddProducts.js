import React from 'react';
import axios from 'axios';

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
      
      <form className="product-form" onSubmit={onSubmit}>
        {/*select name of company*/}
        <select name="company" onChange={(e) => setCompany(e.target.value)}>
          {comp.map((c) => (
            <option key={c._id} value={c.companyName}>
              {c.companyName}
            </option>
          ))}
        </select>

        {/*enter Product Name*/}
        <input
          type="text"
          name="productName"
          placeholder="enter Product Name"
          value={productName}
          autoComplete="off"
          onChange={(e) => setProductName(e.target.value)}
        />
        {/*enter Product photo*/}
        <input
          type="text"
          name="photo"
          placeholder="enter Product photo"
          value={photo}
          autoComplete="off"
          onChange={(e) => setPhoto(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </React.Fragment>
  );
}

export default AddProducts;
