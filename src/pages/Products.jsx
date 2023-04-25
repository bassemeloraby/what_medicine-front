import React from 'react';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import axios from 'axios';
// import noPhoto from '../images/noPhoto.jpg';
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
          <section className="">
            <Button variant="primary" onClick={() => navigate('/companies')}>
              Companies
            </Button>{' '}
          </section>
          <div className="">
            <h2 className="text-center">Products</h2>
            <div className="underline"></div>
          </div>
        </section>
        {/*-------end products header----------*/}
        {/*-------start products-form-show----------*/}
        <section className="products-form-show row">
          {' '}
          {adminOpen && (
            <section className="col-3">
              <AddProducts onAdd={addProduct} />
            </section>
          )}
          {/*------------- end product-form ------ */}
          {/*-------------start product-show------ ------ */}
          <section className="col row justify-content-center">
            {products
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((product) => (
                <Card style={{ width: '18rem' }} key={product._id}>
                  <div className="card-photo">
                    {' '}
                    <Card.Img
                      variant="top"
                      src={product.photo}
                      alt={product.productName}
                      style={{ width: '5rem' }}
                    />
                  </div>

                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    {adminOpen && (
                      <Button
                        variant="danger"
                        onClick={() => deleteCompany(product._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
          </section>
        </section>
        {/*-------end products-form-show----------*/}
      </section>
    </React.Fragment>
  );
}

export default Products;
