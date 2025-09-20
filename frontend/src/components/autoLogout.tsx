import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await axios.get("/api/dashboard", { withCredentials: true });
      } catch (err) {
        alert("Your session expired!");
        navigate("/");
        cookieStore.delete(token)
      }
    }, 15000); // ping every 15 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default AutoLogout;
