// src/hooks/index.js (Better to use this file as an index for hooks)
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext"; // Fix file name casing
import { chatContext } from "../context/ChatProvider";
import { LoadingContext } from "../context/LoadingContext";
import { ContactsContext } from "../context/ContactsContext";


export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useChat = () => useContext(chatContext);
export const useLoading = () => useContext(LoadingContext);
// Custom Hook to use ContactsContext
export const useContacts = () => useContext(ContactsContext);