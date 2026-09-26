export const API_URL = import.meta.env.VITE_API_URL;

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
