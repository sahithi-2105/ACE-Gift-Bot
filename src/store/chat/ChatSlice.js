import axios from "axios";
import { baseUrl } from "@/common/constants";
export const getChatsByUserId = async (userId) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token is missing in localStorage.");
    }

    console.log(`Bearer ${token.trim()}`);
    console.log(userId);

    const response = await axios.get(
      `${baseUrl}/chat`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
        params: {
          user_id: userId,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const fetchChatMessages = async (chatId) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token is missing in localStorage.");
    }

    const response = await axios.get(`${baseUrl}/messages/${chatId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

export const sendMessage = async (chat_id, message, user_id, time) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token is missing in localStorage.");
    }

    const data = {
      chat_id,
      message,
      user_id,
      time,
    };
    const response = await axios.post(`${baseUrl}/messages`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const createNewChat = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token is missing in localStorage.");
    }

    const response = await axios.post(`${baseUrl}/chat`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating new chat:", error);
    throw error;
  }
};

export const updateChatNameController = async (chatId, chatName) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token is missing in localStorage.");
    }

    const response = await axios.put(
      `${baseUrl}/chat/${chatId}`,
      { chat_name: chatName },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating chat name:", error);
    throw error;
  }
};
