import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupController } from "@/store/auth/AuthSlice";

const useSignup = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // For Navigation
  const navigate = useNavigate();

  // User Data
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup Function
  const handleSignup = async (e) => {
    console.log("Signup function called");
    e.preventDefault();
    if (!userName || !email || !password)
      return alert("Please fill all fields");
    setLoading(true);
    try {
      const data = {
        username: userName,
        email,
        password,
      };

      const response = await signupController(data);

      if (response) {
        // Navigate to homepage after successful Signup
        navigate("/");
        window.location.reload();
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    navigate,
    // User Data
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,

    // Signup Function
    handleSignup,
  };
};

export default useSignup;
