import { useState, useEffect } from 'react';
import type { DailyEnergyMix } from '../types/types';
import { fetchEnergyMix } from '../services/apiClient';

export const useEnergyData = () => {
  const [energyData, setEnergyData] = useState<DailyEnergyMix[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchEnergyMix();
      setEnergyData(data);
    } catch {
      setError('Nie udało się pobrać danych');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { energyData, isLoading, error, refetch: loadData };
};
