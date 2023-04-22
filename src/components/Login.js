import React from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const URL = 'https://sore-lime-goat-tam.cyclic.app/api/users';

const Login = ({ setAdminOpen, setAdmin }) => {
  // eslint-disable-next-line
  const [pass, setPass] = React.useState(false);
  const [pass2, setPass2] = React.useState(false);

  //fetch user data from backend
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}`);
        const data = res.data;
        setPass(data);
        const oneData = data[0];
        myVehicle(oneData);

        function myVehicle({ password }) {
          const pass1 = password;
          setPass2(pass1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [setPass]);

  const getPass = (e) => {
    const passData = e.target.value;

    if (passData === pass2) {
      setAdminOpen(true);
      setAdmin(false);
    }
  };

  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Password"
            autoFocus
            onChange={getPass}
          />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
};

export default Login;
