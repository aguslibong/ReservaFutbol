// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Reemplaza con tu URL base
  timeout: 1000, // Opcional: tiempo de espera de la solicitud en milisegundos
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar otros encabezados si es necesario
  }
});

export default axiosInstance;
