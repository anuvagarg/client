import React from "react";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import { Button } from "reactstrap";

const Home = () => {
  const { username } = userData();
  return (
    <div>
      <CustomNav />
      <div className="home">
        <h2>Welcome, {username}!</h2>
        <Button className="chat-hm-btn">Start Chat</Button>
      </div>
    </div>
  );
};

export default Home;