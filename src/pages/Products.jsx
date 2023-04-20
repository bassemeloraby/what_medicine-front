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
      <div>
        <button onClick={() => navigate('/companies')}>Companies</button>
      </div>
      <section className={adminOpen ? 'product-main-login' : 'product-main'}>
        <section
          className={
            adminOpen ? 'product-form container' : 'product-form-logout'
          }
        >
          <AddProducts onAdd={addProduct} />
        </section>
        <section
          className={
            adminOpen
              ? 'container product-show-login'
              : 'container product-show'
          }
        >
          {products.map((product) => (
            <div key={product._id}>
              <div
                style={{
                  justifyContent: 'center',
                  display: 'grid',
                  margin: '5px',
                }}
                className="product-card-photo"
              >
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.productName}
                    width={"100%"}
                    height={"100%"}
                  />
                ) : (
                  <img src={noPhoto} alt={product.productName} width={200} />
                )}
              </div>
              <div>
                <ul className="container">
                  <li style={{ textAlign: 'center' }}>
                    <h3>{product.productName}</h3>
                  </li>
                  <li>{product.company}</li>
                </ul>
              </div>
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
            </div>
          ))}
        </section>
      </section>
    </React.Fragment>
  );
}

export default Products;
