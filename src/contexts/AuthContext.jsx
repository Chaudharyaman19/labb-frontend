// import React, { createContext, useContext, useState, useEffect } from "react";
// import { apiClient } from "@/lib/api";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPackageData, setSelectedPackageData] = useState();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       apiClient.setToken(token);
//       fetchCurrentUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await apiClient.getCurrentUser();
//       if (response.status === "SUCCESS") {
//         setUser(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch current user:", error);
//       apiClient.clearToken();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (phone, password) => {
//     try {
//       const response = await apiClient.login({ phone, password });
//       if (response.status === "SUCCESS") {
//         apiClient.setToken(response.data.token);

//         const currentUserResponse = await apiClient.getCurrentUser();
//         if (currentUserResponse.status === "SUCCESS") {
//           setUser(currentUserResponse.data);
//         }
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await apiClient.register(userData);
//       if (response.status === "SUCCESS") {
//         await login(userData.phone, userData.password);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     apiClient.clearToken();
//     setUser(null);
//   };

//   const handleSelectPackage = (val) => {
//     setSelectedPackageData(val);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     handleSelectPackage,
//     selectedPackageData,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // AuthContext.jsx
  const [selectedPackageData, setSelectedPackageData] = useState(() => {
    localStorage.removeItem("selectedPackage");
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.status === "SUCCESS") {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      apiClient.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone, password) => {
    try {
      const response = await apiClient.login({ phone, password });
      if (response.status === "SUCCESS") {
        apiClient.setToken(response.data.token);

        const currentUserResponse = await apiClient.getCurrentUser();
        if (currentUserResponse.status === "SUCCESS") {
          setUser(currentUserResponse.data);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.register(userData);
      if (response.status === "SUCCESS") {
        await login(userData.phone, userData.password);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
    setSelectedPackageData(null);
  };

  // In your AuthContext
  function handleSelectPackage(pkg) {
    setSelectedPackageData(pkg);
    if (pkg) {
      localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    } else {
      localStorage.removeItem("selectedPackage");
    }
  }

  // On context load
  useEffect(() => {
    const savedPkg = localStorage.getItem("selectedPackage");
    if (savedPkg) setSelectedPackageData(JSON.parse(savedPkg));
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    handleSelectPackage,
    selectedPackageData,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
