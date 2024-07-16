import React from "react";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Home = () => {
  const { username } = userData();
  return (
    <div>
      <CustomNav />
      <div className="home">
        <h2>Welcome, {username}!</h2>
        <Link to="/chat">
          <Button color="primary">Start Ditto</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;