import React from "react";
import useServiceWorker from "./hooks/useServiceWorker ";
import AppRouter from "./routes/AppRouter";


const App = () => {
    useServiceWorker(); // Register the service worker


    return <AppRouter />;
};

export default App;
