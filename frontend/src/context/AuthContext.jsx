import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  // 🔑 Fetch profile if token exists
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Fetch profile failed", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

const updateProfile = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.put(
      "http://localhost:5000/api/user/me",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data); 
    return res.data;
  };
const updateUserLocal = (updatedUser) => {
  setUser(updatedUser);
};

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, fetchProfile, updateProfile, updateUserLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
