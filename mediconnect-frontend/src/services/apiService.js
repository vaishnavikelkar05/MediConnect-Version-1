import axios from 'axios';
import API_BASE_URL from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test API
export const testBackend = () => api.get('/test');

// Hospitals
export const getHospitals = (search = '') =>
  api.get('/hospitals', { params: search ? { search } : {} });

export const getHospitalById = (id) => api.get(`/hospitals/${id}`);

// Doctors
export const getDoctors = (hospitalId = null, specialization = '') => {
  const params = {};
  if (hospitalId) params.hospitalId = hospitalId;
  if (specialization) params.specialization = specialization;
  return api.get('/doctors', { params });
};

// Blood
export const getBlood = (group = '', hospitalId = null) => {
  const params = {};
  if (group) params.group = group;
  if (hospitalId) params.hospitalId = hospitalId;
  return api.get('/blood', { params });
};

// Recommend Specialist
export const recommendSpecialist = (symptom) =>
  api.post('/recommend-specialist', { symptom });

// Emergency
export const triageEmergency = (payload) =>
  api.post('/emergency/triage', payload);

export const recommendEmergencyDoctor = (payload) =>
  api.post('/emergency/appointments/recommend', payload);

export const bookEmergencyAppointment = (payload) =>
  api.post('/emergency/appointments', payload);

export const recommendAmbulance = (payload) =>
  api.post('/emergency/ambulances/recommend', payload);

export const getBedAvailability = () =>
  api.get('/emergency/beds');

export const getEmergencyRoute = (params) =>
  api.get('/emergency/route', { params });

export const syncOfflineEmergency = (payload) =>
  api.post('/emergency/offline-sync', payload);

export default api;
