import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  const [filter, setFilter] = React.useState('');

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
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value='*'>All</option>
              <option value="cleanser">cleanser</option>
              <option value="Sunscreen">Sunscreen</option>
            </Form.Select>
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
          <section className="col row justify-content-around">
            {products
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .filter((product) => product.category === filter)
              .map((product) => (
                <Card
                  style={{ width: '18rem', backgroundColor: 'antiquewhite' }}
                  key={product._id}
                  className=" mb-3"
                >
                  <div
                    className="card-photo mt-2"
                    style={{ backgroundColor: 'black' }}
                  >
                    {' '}
                    <Card.Img
                      variant="top"
                      src={product.photo}
                      alt={product.productName}
                      className=""
                      height={400}
                    />
                  </div>

                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    {adminOpen && (
                      <ul className="list-group">
                        <li className="list-group-item">
                          Company: {product.company}
                        </li>
                        <li className="list-group-item">
                          Category: {product.category}
                        </li>
                        <li className="list-group-item">age: {product.age}</li>
                      </ul>
                    )}
                    <div className="">
                      {adminOpen && (
                        <Button
                          variant="danger"
                          onClick={() => deleteCompany(product._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
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
