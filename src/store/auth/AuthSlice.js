import axios from "axios";
import { baseUrl } from "@/common/constants";

export const loginController = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/auth/login", data);
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userDetails", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupController = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/auth/signup", data);
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
