// Decode JWT token without a library
export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  const expiryTime = decoded.exp * 1000;
  const now = Date.now();

  // Add 30 second buffer to avoid edge cases
  return now >= expiryTime - 30000;
};

// Check token and clear if expired
export const checkAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    clearAuth();
    return false;
  }

  return true;
};

// Clear auth data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
