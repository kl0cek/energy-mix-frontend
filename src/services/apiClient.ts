import axios from 'axios';
import type { DailyEnergyMix, OptimalChargingWindow } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchEnergyMix = async (): Promise<DailyEnergyMix[]> => {
  const response = await axios.get<DailyEnergyMix[]>(`${API_BASE_URL}/energy-mix`);
  return response.data;
};

export const fetchOptimalCharging = async (duration: number): Promise<OptimalChargingWindow> => {
  const response = await axios.get<OptimalChargingWindow>(`${API_BASE_URL}/optimal-charging`, {
    params: { duration },
  });
  return response.data;
};
