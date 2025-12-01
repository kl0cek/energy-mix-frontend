import { useState } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import dotenv from 'dotenv'

dotenv.config()

interface ChargingFormProps {
  onSubmit: (duration: number) => void;
  isLoading: boolean;
}

export const ChargingForm = ({ onSubmit, isLoading }: ChargingFormProps) => {
  const [duration, setDuration] = useState<number>(0);
  const { theme } = useThemeContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(duration);
  };

  return (
    <div
      className={`${theme === 'dark' ? 'bg-sky-950 text-slate-200' : 'bg-white text-gray-900'} rounded-lg shadow-md p-6`}
    >
      <h3 className="text-xl font-semibold mb-4">Optymalne okno ładowania</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-2">
            Czas ładowania (godziny)
          </label>
          <input
            type="number"
            id="duration"
            min={process.env.VITE_MIN_CHARGING_HOURS}
            max={process.env.VITE_MAX_CHARGING_HOURS}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className={`w-full px-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-slate-800 text-slate-200' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={isLoading}
          />
          <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
            Podaj czas w przedziale od 1 do 6 godzin
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Obliczanie...' : 'Znajdź optymalne okno'}
        </button>
      </form>
    </div>
  );
};
