import { createContext, useContext, useState, useEffect } from "react";
import { AllContactsApi } from "../api/auth"; // Ensure this API function accepts userId

// Create ContactsContext
export const ContactsContext = createContext();

// Context Provider Component
export const ContactsProvider = ({ children, userId }) => {
    const [regularUsers, setRegularUsers] = useState([]);
    const [aiUsers, setAiUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContacts = async () => {
        setLoading(true); // Ensure loading state is managed properly
        try {
            const response = await AllContactsApi(userId); // Pass userId to API
            if (response.success) {
                setRegularUsers(response.contacts.regularUsers || []);
                setAiUsers(response.contacts.aiUsers || []);
                console.log('Fetched Data AI users', aiUsers);

            } else {
                throw new Error(response.message || "Failed to fetch contacts");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContactsContext.Provider value={{ regularUsers, aiUsers, loading, fetchContacts, error }}>
            {children}
        </ContactsContext.Provider>
    );
};


