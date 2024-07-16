import {React, useState} from "react";
import { Input, FormGroup, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";

const initialUser = {password: "", identifier: ""};

const Login = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = ({target}) => { 
        const {name, value} = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
    const url = `https://young-virtue-d178786b6e.strapiapp.com/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

    return(
        <Row className="login">
            <Col sm = {{size: 4, offset: 4}} md= {{size: 4, offset: 4}}>
            <div>
                <h2>Login</h2>
                <FormGroup>
                    <Input type="email" name="identifier" value={user.identifier} onChange={handleChange} placeholder="Enter your email" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter password" />
                </FormGroup>
                <Button color="primary" onClick={handleLogin}>
                    Login
                </Button>
                <h6>
                    or  <Link to='/registration'>Click to Sign Up</Link>
                </h6>
            </div>
            </Col>
        </Row>
    );
};

export default Login;