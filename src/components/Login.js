import React from 'react';
import axios from 'axios';

const URL = 'https://sore-lime-goat-tam.cyclic.app/api/users';

const Login = ({ setAdminOpen, setAdmin }) => {
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
      <div className="login-section">
        <input type="password" autoFocus onChange={getPass} />
      </div>
    </React.Fragment>
  );
};

export default Login;
