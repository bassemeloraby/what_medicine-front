import React from 'react';
import axios from 'axios';

const URL = "https://sore-lime-goat-tam.cyclic.app/api/users"

const Login = () => {
  const [user, setUser] = React.useState("");

  //fetch user data from backend
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}`);
        const data = res.data;
        setUser(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <div className="login-section">
        <input type="password" autoFocus  />
      </div>
    </React.Fragment>
  );
};

export default Login;
