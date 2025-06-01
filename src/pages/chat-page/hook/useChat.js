import React, { useEffect, useRef, useState } from "react";
import {
  createNewChat,
  fetchChatMessages,
  getChatsByUserId,
  sendMessage,
  updateChatNameController,
} from "@/store/chat/ChatSlice";

const useChat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const formatMessage = (msg) => {
    if (!msg || typeof msg !== "string") return "";

    return (
      msg
        // Headers (###, ##, #)
        .replace(/^### (.*?)$/gm, "<h3 style='margin: 0.5rem 0;'>$1</h3>")
        .replace(/^## (.*?)$/gm, "<h2 style='margin: 0.75rem 0;'>$1</h2>")
        .replace(/^# (.*?)$/gm, "<h1 style='margin: 1rem 0;'>$1</h1>")

        // Bold and Italics
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")

        // Code block
        .replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
          const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return `<pre style='background:#f4f4f4;padding:0.75rem;border-radius:8px;overflow:auto;'><code>${escapedCode}</code></pre>`;
        })

        // Inline code
        .replace(
          /`([^`]+)`/g,
          "<code style='background:#eee;padding:2px 4px;border-radius:4px;'>$1</code>"
        )

        // Bulleted list
        .replace(/^- (.*?)(\n|$)/gm, "<li>$1</li>")
        .replace(
          /(<li>.*<\/li>)/gms,
          "<ul style='padding-left: 1.5rem;'>$1</ul>"
        ) // wrap in ul if needed

        // Line breaks
        .replace(/\n/g, "<br/>")
    );
  };

  // Chat Data
  const [chatName, setChatName] = useState("New Chat");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Function to fetch all chats
  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await getChatsByUserId(userDetails.user_id);
      console.log(response);
      setChats(response.data);
      setChatName(response.data[response.data.length - 1].chat_name);
      setSelectedChat(response.data[response.data.length - 1]);
      const msgs = await fetchChatMessages(
        response.data[response.data.length - 1].chat_id
      );
      setMessages(msgs.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to send msg
  const sendMsg = async () => {
    try {
      setIsSending(true);
      setMessages((prev) => [
        ...prev,
        {
          user_id: userDetails.user_id,
          message: input,
        },
      ]);

      const msg = input;
      setInput("");

      const response = await sendMessage(
        selectedChat.chat_id,
        msg,
        userDetails.user_id,
        new Date().toISOString()
      );
      console.log(response);
      setMessages((prev) => [
        ...prev,
        {
          user_id: 1,
          message: response.data,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Function to create new chat
  const createChat = async () => {
    try {
      setIsCreating(true);
      const response = await createNewChat({
        chat_name: chatName,
        user_id: userDetails.user_id,
      });
      console.log(response);
      setChats((prev) => [...prev, response.data]);
      setSelectedChat(response.data);
      const msgs = await fetchChatMessages(response.data.chat_id);
      setMessages(msgs.data);
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Function to change the chat name
  const updateChatName = async () => {
    try {
      const response = await updateChatNameController(
        selectedChat.chat_id,
        chatName
      );
      console.log(response);
      setChats((prev) =>
        prev.map((chat) =>
          chat.chat_id === selectedChat.chat_id
            ? { ...chat, chat_name: chatName }
            : chat
        )
      );
    } catch (error) {
      console.error("Error updating chat name:", error);
    }
  };

  // Function to change chat
  const changeChat = async (newValue) => {
    setSelectedChat(chats.find((chat) => chat.chat_id === newValue.id));
    setChatName(newValue.label);
    const msgs = await fetchChatMessages(newValue.id);
    setMessages(msgs.data);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    messages,
    input,
    setInput,
    loading,
    showEmojiPicker,
    setShowEmojiPicker,
    onEmojiClick,
    messagesEndRef,

    // Chat data
    chats,
    selectedChat,
    setSelectedChat,
    formatMessage,
    chatName,
    setChatName,
    sendMsg,
    isSending,
    createChat,
    isCreating,
    updateChatName,
    changeChat,
  };
};

export default useChat;
