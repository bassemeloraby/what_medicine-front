import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import axios from 'axios';
import noPhoto from '../images/noPhoto.jpg';
import AddProducts from '../components/AddProducts';
import Loading from '../components/Loading';
const pruductURL = 'https://sore-lime-goat-tam.cyclic.app/api/products';

function Products() {
  const { adminOpen } = useGlobalContext();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  //fetch product data from backend
  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${pruductURL}`);
        setLoading(false);
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // add Product
  const addProduct = async (comp) => {
    console.log(comp);
    const res = await axios.post(`${pruductURL}`, comp);

    const newProduct = res.data;
    console.log(newProduct);
    setProducts([...products, newProduct]);
  };

  //delete company
  function deleteCompany(_id) {
    axios.delete(`${pruductURL}/${_id}`);
    const newList = products.filter((product) => product._id !== _id);
    setProducts(newList);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <section className="container">
        {/*-------start products header----------*/}
        <section className="">
          {' '}
          {/* navigate to company*/}
          <section className="products-header-nav">
            <button onClick={() => navigate('/companies')}>Companies</button>
          </section>
          <div className="products-header-address">
            <h2>Products</h2>
            <div className="underline"></div>
          </div>
        </section>
        {/*-------end products header----------*/}
        <section className={adminOpen ? 'product-main-login' : 'product-main'}>
          <section
            className={
              adminOpen ? 'product-form container' : 'product-form-logout'
            }
          >
            <AddProducts onAdd={addProduct} />
          </section>
          {/*-------------product-show------ ------ */}
          <section
            className={
              adminOpen
                ? 'container product-show product-show-login'
                : 'container product-show'
            }
          >
            {products
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((product) => (
                <div key={product._id} className="product-show-card">
                  {/*------------- start product-card-photo------- ------ */}
                  <div className="product-card-photo">
                    {product.photo ? (
                      <img src={product.photo} alt={product.productName} />
                    ) : (
                      <img
                        src={noPhoto}
                        alt={product.productName}
                        width={200}
                      />
                    )}
                  </div>
                  {/*------------- end product-card-photo------- ------ */}
                  {/*------------- start product-details------- ------ */}
                  <div className="container product-details">
                    <div className="product-details-title">
                      <h3>{product.productName}</h3>
                    </div>
                    <div className="product-details-body">
                      {' '}
                      <ul>
                        <li>company: {product.company}</li>
                        <li>company: {product.company}</li>
                        <li>company: {product.company}</li>
                        <li>company: {product.company}</li>
                      </ul>
                    </div>
                  </div>
                  {/*------------- start product-button when login as admin------- ------ */}
                  {adminOpen ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => deleteCompany(product._id)}
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  {/*------------- end product-button when login as admin------- ------ */}
                </div>
              ))}
          </section>
        </section>
      </section>
    </React.Fragment>
  );
}

export default Products;
