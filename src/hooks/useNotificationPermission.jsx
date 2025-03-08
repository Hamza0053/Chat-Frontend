import { useEffect, useState } from "react";

const useNotificationPermission = () => {
    const [permission, setPermission] = useState(Notification.permission);
    
    useEffect(() => {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            Notification.requestPermission().then((newPermission) => {
                setPermission(newPermission);
                console.log(`Notification permission: ${newPermission}`);
            });
        } else {
            console.log('Browser does not support push notifications.');
        }
    }, []);

    return permission; // Return permission state if needed
};

export default useNotificationPermission;
