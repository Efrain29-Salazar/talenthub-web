import axios from 'axios';

// El cliente de axios: la dirección de la API se escribe SOLO aquí (viene del archivo .env.development).
// El timeout corta la petición si la API no responde a tiempo.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});
