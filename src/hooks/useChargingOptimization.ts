import { useState } from 'react';
import type { OptimalChargingWindow } from '../types/types';
import { fetchOptimalCharging } from '../services/apiClient';

export const useChargingOptimization = () => {
  const [result, setResult] = useState<OptimalChargingWindow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (duration: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOptimalCharging(duration);
      setResult(data);
    } catch {
      setError('Nie udało się obliczyć');
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, calculate };
};
