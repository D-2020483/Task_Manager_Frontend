import api from "./api";

//login function
export const login = async (formData) => {
    const response = await api.post("/auth/login", formData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
};

//register function
export const register = async (formData) => {
    const response = await api.post("/auth/register", formData);
    const { token } = response.data;
    return response.data;
};

//logout function
export const logout = () => {
    localStorage.removeItem("token");
};

//check user is logged in
export const isAuthenticated = () => {
    return !! localStorage.getItem("token");
};