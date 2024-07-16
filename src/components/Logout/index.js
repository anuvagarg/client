import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Optionally, clear cookies or other storage methods if used
    document.cookie = 'token=; Max-Age=0; path=/; domain=master--ditto-client.netlify.app;';

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
