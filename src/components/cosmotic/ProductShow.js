import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProductShow({ products, adminOpen, deleteCompany }) {
  return (
    <section className="col row justify-content-around">
      {products
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
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
                  <li className="list-group-item">age: {product.age}</li>
                  <li className="list-group-item">
                    protection Kind: {product.protectionKind}
                  </li>
                  <li className="list-group-item">
                    protection for: {product.protectionFor}
                  </li>
                </ul>
              )}
              <div className="">
                {adminOpen && (
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => deleteCompany(product._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      // onClick={() => deleteCompany(product._id)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
    </section>
  );
}

export default ProductShow;
