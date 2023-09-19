import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Spinner from "../../components/Spinner";
import { Virtuoso } from "react-virtuoso";
import { VscArrowSmallRight } from "react-icons/vsc";

import { InputGroup, Button, Form } from "react-bootstrap";
import { mainUrl } from "../../data";
const url = mainUrl + "drugs";

function Medicine() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState();

  const navigate = useNavigate();

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}`);
      setLoading(false);
      setDrugs(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDrugs();
  }, []);

  useEffect(() => {
    if (!query) setItems(drugs);
    setItems((_) =>
      drugs.filter(
        (x) =>
          x.ScientificName.toLowerCase().includes(query?.toLowerCase()) ||
          x.TradeName.toLowerCase().includes(query?.toLowerCase())
      )
    );
  }, [query, drugs]);

  useEffect(() => {
    setItems(drugs);
  }, [drugs]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="d-flex mb-2">
          <h2>Medicine</h2>
          <Button variant="primary">+ Add</Button>{" "}
        </div>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Trade Name or Scientific Name"
            autoComplete="off"
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Virtuoso
          style={{ height: "600px", background: "#f8f8f8" }}
          data={items}
          totalCount={10000}
          itemContent={(index, drug) => (
            <div
              style={{
                background: index % 2 === 0 ? "#ffbb00" : "#ffcc99",
                color: "#333",
                padding: "10px",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "5px 0",
              }}
            >
              <h3>
                {drug.TradeName}{" "}
                <VscArrowSmallRight
                  onClick={() => navigate(`/card/${drug._id}`)}
                />
              </h3>
              <h6>{drug.ScientificName} </h6>
              <h6>{drug.PublicPrice} SR</h6>
            </div>
          )}
        />
      </div>
    </Fragment>
  );
}

export default Medicine;
