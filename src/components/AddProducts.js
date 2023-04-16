import React from 'react';
import axios from 'axios';
import { proGroup } from '../data';
const URL = 'https://sore-lime-goat-tam.cyclic.app/api/companies';
function AddProducts({ onAdd }) {
  const [comp, setComp] = React.useState([]);
  const [company, setCompany] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [productGroup, setProductGroup] = React.useState(proGroup);
  

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
    if (!company || !productName) {
      alert('Please add all fields');
      return;
    }
    onAdd({ company, productName });
    console.log(productName);
    setCompany('');
    setProductName('');
  };

  return (
    <React.Fragment>
      <div>
        admin notes
        <br />
        Products.jsx
      </div>
      <form className="product-form" onSubmit={onSubmit}>
        {/*select name of company*/}
        <select name="company" onChange={(e) => setCompany(e.target.value)}>
          {comp.map((c) => (
            <option key={c._id} value={c.companyName}>
              {c.companyName}
            </option>
          ))}
          {/*select name of group if company is Bioderma */}
        </select>
        {company === 'Bioderma' ? (
          <select
            name="productGroup"
            onChange={(e) => setProductGroup(e.target.value)}
          >
            {productGroup.map((c) => (
              <option key={c._id} value={c.groupName}>
                {c.groupName}
              </option>
            ))}
          </select>
        ) : (
          ''
        )}
        {/*enter Product Name*/}
        <input
          type="text"
          name="productName"
          placeholder="enter Product Name"
          value={productName}
          autoComplete="off"
          onChange={(e) => setProductName(e.target.value)}
        />
        
        <button type="submit">Add</button>
      </form>
    </React.Fragment>
  );
}

export default AddProducts;
