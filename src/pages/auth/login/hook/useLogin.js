import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginController } from "@/store/auth/AuthSlice";

const useLogin = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // For Navigation
  const navigate = useNavigate();

  // User Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Function
  const handleLogin = async (e) => {
    console.log("Login function called");
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");
    setLoading(true);
    try {
      const data = {
        email,
        password,
      };

      const response = await loginController(data);

      if (response) {
        // Navigate to homepage after successful login
        navigate("/");
        window.location.reload();
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    navigate,
    // User Data
    email,
    setEmail,
    password,
    setPassword,

    // Login Function
    handleLogin,
  };
};

export default useLogin;
