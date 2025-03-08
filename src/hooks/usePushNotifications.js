import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
// Replace with your actual VAPID key

const usePushNotifications = () => {
    const [subscription, setSubscription] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        checkSubscription();
    }, []);

    // ✅ Check if user is already subscribed
    const checkSubscription = async () => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            const swRegistration = await navigator.serviceWorker.ready;
            const existingSubscription = await swRegistration.pushManager.getSubscription();

            setSubscription(existingSubscription);
            setIsSubscribed(!!existingSubscription);
        }
    };

    // ✅ Subscribe to Push Notifications
    const subscribeToNotifications = async () => {
        console.log('This is VPID ', VAPID_PUBLIC_KEY);
        const user = JSON.parse(localStorage.getItem('user'))
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
            console.log("Push notifications are not supported by your browser.");
            return;
        }

        try {
            const swRegistration = await navigator.serviceWorker.ready;
            const pushSubscription = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY,
            });

            // Send subscription to backend
            await fetch(`${API_BASE_URL}/api/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" , 'Authorization': `Bearer ${user?.idToken}` },
                body: JSON.stringify(pushSubscription),
            });

            setSubscription(pushSubscription);
            setIsSubscribed(true);
            console.log("Subscribed to push notifications!", pushSubscription);
        } catch (error) {
            console.error("Subscription failed:", error);
        }
    };

    // ✅ Unsubscribe from Push Notifications
    const unsubscribeFromNotifications = async () => {
        if (!subscription) return;

        try {
            await subscription.unsubscribe();
            setSubscription(null);
            setIsSubscribed(false);
            console.log("Unsubscribed from push notifications.");
        } catch (error) {
            console.error("Unsubscription failed:", error);
        }
    };

    return {
        isSubscribed,
        subscribeToNotifications,
        unsubscribeFromNotifications,
    };
};

export default usePushNotifications;
