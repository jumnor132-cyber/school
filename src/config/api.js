/**
 * API Configuration Module
 *
 * Centralized backend URL configuration for all React components.
 * To change backend target (localhost vs live server), edit `frotend/.env`:
 *   REACT_APP_API_URL=http://localhost:8000
 * or:
 *   REACT_APP_API_URL=https://student-backend-1gcn.onrender.com
 *
 * NOTE: Create React App requires custom environment variables to start with `REACT_APP_`.
 * Remember to restart the dev server (`npm start`) after modifying `.env`.
 */

const rawBaseUrl =
  process.env.REACT_APP_API_URL || "https://student-backend-1gcn.onrender.com";

// Remove trailing slash if present to avoid double slashes
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

// Alias for convenience
export const BASE_URL = API_BASE_URL;

// Helper to construct endpoint URLs cleanly
export const getApiUrl = (endpoint = "") => {
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  return cleanEndpoint ? `${API_BASE_URL}/${cleanEndpoint}` : API_BASE_URL;
};

// Common API endpoints used across components
export const API_ENDPOINTS = {
  STUDENTS: getApiUrl("student_API.php"),
  LOGIN: getApiUrl("login.php"),
  LOGOUT: getApiUrl("logout.php"),
  SESSION: getApiUrl("check_session.php"),
  DELETE: getApiUrl("delete.php"),
  UPDATE: getApiUrl("update.php"),
};

// Named exports for convenient direct imports:
// e.g. import { API_URL, LOGIN_URL, SESSION_URL } from "../config/api";
export const API_URL = API_ENDPOINTS.STUDENTS;
export const LOGIN_URL = API_ENDPOINTS.LOGIN;
export const LOGOUT_URL = API_ENDPOINTS.LOGOUT;
export const SESSION_URL = API_ENDPOINTS.SESSION;
export const DELETE_URL = API_ENDPOINTS.DELETE;
export const UPDATE_URL = API_ENDPOINTS.UPDATE;

const apiConfig = {
  BASE_URL: API_BASE_URL,
  API_BASE_URL,
  getApiUrl,
  endpoints: API_ENDPOINTS,
};

export default apiConfig;
