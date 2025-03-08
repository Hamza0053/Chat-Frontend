import { createContext, useContext, useState } from "react";
import LoadingSpinner from "../components/Loader/LoadingSpinner";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {loading && <LoadingSpinner />}
        </LoadingContext.Provider>
    );
};

// Export the context hook for easy usage

