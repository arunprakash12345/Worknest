import { checkAuthToken, clearAuth, getAuthHeader } from "./auth";

// Wrapper for fetch that handles auth
export const authFetch = async (url, options = {}) => {
  // Check token before making request
  if (!checkAuthToken()) {
    window.dispatchEvent(new CustomEvent("unauthorized", { detail: { status: 401 } }));
    throw new Error("Session expired");
  }

  // Add auth header
  const headers = {
    ...options.headers,
    ...getAuthHeader(),
  };

  const response = await fetch(url, { ...options, headers });

  // Handle 401 responses
  if (response.status === 401) {
    clearAuth();
    window.dispatchEvent(new CustomEvent("unauthorized", { detail: { status: 401 } }));
    throw new Error("Session expired");
  }

  return response;
};

// JSON fetch helper
export const apiFetch = async (url, options = {}) => {
  const response = await authFetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return response;
};
