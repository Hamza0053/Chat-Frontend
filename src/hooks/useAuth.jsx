// src/hooks/index.js (Better to use this file as an index for hooks)
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext"; // Fix file name casing
import { chatContext } from "../context/ChatProvider";
import { LoadingContext } from "../context/LoadingContext";
import { ContactsContext } from "../context/ContactsContext";
import { CallContext } from "../context/CallContext";

export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useChat = () => useContext(chatContext);
export const useLoading = () => useContext(LoadingContext);
export const useContacts = () => useContext(ContactsContext);
export const useCall = () => useContext(CallContext);