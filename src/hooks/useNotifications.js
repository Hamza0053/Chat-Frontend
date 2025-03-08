import { useEffect, useState } from "react";

const useNotifications = () => {
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log('This is new Notificaton', event.data.payload);
                if (event.data && event.data.type === "PUSH_NOTIFICATION") {
                    console.log('This is new Notificaton', event.data.payload);
                    setNotifications(event.data.payload);
                }
            });
        }
    }, []);

    return { notifications };
};

export default useNotifications;
