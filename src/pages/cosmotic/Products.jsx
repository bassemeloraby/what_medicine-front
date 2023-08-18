import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { categotyData } from "../../data";

import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import axios from "axios";
// import noPhoto from '../images/noPhoto.jpg';
import AddProducts from "../../components/cosmotic/AddProducts";
import Spinner from "../../components/Spinner";
import ProductShow from "../../components/cosmotic/ProductShow";
const pruductURL = "https://sore-lime-goat-tam.cyclic.app/api/products";

function Products() {
  const { adminOpen } = useGlobalContext();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("");

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
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <section className="container">
        {/*-------start products header----------*/}
        <section className="">
          {" "}
          {/* navigate to company*/}
          <section className="">
            <Button variant="primary" onClick={() => navigate("/companies")}>
              Companies
            </Button>{" "}
            <Button variant="danger" onClick={() => setFilter("")}>
              All
            </Button>
            {categotyData.map((c, index) => (
              <Button
                className="m-1"
                variant="success"
                onClick={() => setFilter(`${c.name}`)}
                key={index}
              >
                {c.name}
              </Button>
            ))}
          </section>
          <div className="">
            <h2 className="text-center">Products</h2>
            <div className="underline"></div>
          </div>
        </section>
        {/*-------end products header----------*/}
        {/*-------start products-form-show----------*/}

        <section className="products-form-show row">
          {" "}
          {adminOpen && (
            <section className="col-3">
              <AddProducts onAdd={addProduct} />
            </section>
          )}
          {/*------------- end product-form ------ */}
          {/*-------------start product-show------ ------ */}
          {filter === "" ? (
            <ProductShow
              products={products}
              adminOpen={adminOpen}
              deleteCompany={deleteCompany}
            />
          ) : (
            <section className="col row justify-content-around">
              {products
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .filter((p) => p.category === filter)
                .map((product) => (
                  <Card
                    style={{ width: "18rem", backgroundColor: "antiquewhite" }}
                    key={product._id}
                    className=" mb-3"
                  >
                    <div
                      className="card-photo mt-2"
                      style={{ backgroundColor: "black" }}
                    >
                      {" "}
                      <Card.Img
                        variant="top"
                        src={product.photo}
                        alt={product.productName}
                        className=""
                        height={300}
                        width={150}
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
                          <li className="list-group-item">
                            age: {product.age}
                          </li>
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
          )}
        </section>
        {/*-------end products-form-show----------*/}
      </section>
    </React.Fragment>
  );
}

export default Products;
