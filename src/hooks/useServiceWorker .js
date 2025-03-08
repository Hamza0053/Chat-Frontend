import { useEffect } from "react";

const useServiceWorker = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js") // Use absolute path
                .then((registration) => {
                    console.log(
                        "Service Worker registered with scope:",
                        registration.scope
                    );
                })
                .catch((error) => {
                    console.log("Service Worker registration failed:", error);
                });
        }
    }, []);
};

export default useServiceWorker;
