// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { LogOut, updateProfile, UserProfile } from "../api/auth";
import usePushNotifications from "../hooks/usePushNotifications";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { subscribeToNotifications } = usePushNotifications()
    // Check for stored auth token


    const updateProfileHandler = async (data) => {
        const response = await updateProfile(data)
        if (response?.success) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const profile = response?.profile
            setUser({ ...storedUser, ...profile });
        }

        return response?.success
    }

    const LogOutHandler = async () => {
        const response = await LogOut({ uid: user?.userId })
        if (response?.success) {
            setUser(null);
            localStorage.removeItem("user");
        }
        return response?.success
    }

    useEffect(() => {
        const FetchUserHandler = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                const profileData = await UserProfile()
                if (profileData?.success) {
                    const profile = profileData?.user[0]
                    setUser({ ...storedUser, ...profile });
                }
            }
        }
        FetchUserHandler()
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify({
            idToken: userData?.idToken,
            isLogin: true
        }));
        subscribeToNotifications()

    };


    return (
        <AuthContext.Provider value={{ user, login, LogOutHandler, updateProfileHandler }}>
            {children}
        </AuthContext.Provider>
    );
};
