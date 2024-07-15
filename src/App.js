import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import Chat from "./components/Chat";
import { ToastContainer } from "react-toastify";
import { Protector } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protector Component={Home} />} />
          <Route path="/chat" element={<Protector Component={Chat} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
  );
}

export default App;