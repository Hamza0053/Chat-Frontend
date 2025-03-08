// src/api/auth.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Vite uses import.meta.env

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    }); 4
    return response.data; // Returns user data & token
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
};

export const updateProfile = async (formData) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {

    const response = await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}
export const LogOut = async (userCredential) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {

    const response = await axios.post(`${API_BASE_URL}/auth/logout`, userCredential, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}

export const AllContactsApi = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const response = await axios.get(`${API_BASE_URL}/api/contacts`, {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      },
    });
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}


export const UserProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}


export const ChatList = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  try {

    const response = await axios.get(`${API_BASE_URL}/api/chat`, {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}


export const CreateChat = async (data) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {

    const response = await axios.post(`${API_BASE_URL}/api/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}


export const FetchMessages = async (chatId) => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log('user for ligin is ==============  ', user);

  try {

    const response = await axios.get(`${API_BASE_URL}/api/messages/${chatId}`, {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      },
    });

    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : "Network Error";
  }
}