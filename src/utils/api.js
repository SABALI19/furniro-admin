export const API_BASE_URL = (import.meta.env.VITE_BASE_URL || "http://localhost:5000").replace(
  /\/+$/,
  "",
);

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const toImageUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) {
    return value;
  }
  if (value.startsWith("/uploads/")) {
    return `${API_BASE_URL}${value}`;
  }
  if (value.startsWith("uploads/")) {
    return `${API_BASE_URL}/${value}`;
  }
  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }
  return `${API_BASE_URL}/uploads/${value}`;
};
