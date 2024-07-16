import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call the Strapi logout API
        await axios.post('https://young-virtue-d178786b6e.strapiapp.com/api/logout', {}, {
          withCredentials: true, // Include cookies in the request if needed
        });

        // Clear user data from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
