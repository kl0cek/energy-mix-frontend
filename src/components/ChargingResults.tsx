import type { OptimalChargingWindow } from '../types/types';
import { formatDate } from '../utils/date';
import { useThemeContext } from '../hooks/useThemeContext';

interface ChargingResultProps {
  result: OptimalChargingWindow;
}

export const ChargingResult = ({ result }: ChargingResultProps) => {
  const isSameDay = result.startDate === result.endDate;
  const { theme } = useThemeContext();

  return (
    <div
      className={`${theme === 'dark' ? 'bg-sky-950 text-slate-200' : 'bg-white text-gray-900'} rounded-lg shadow-md p-6`}
    >
      <h3 className="text-xl font-semibold mb-4">Wynik optymalizacji</h3>

      <div className="space-y-3">
        <div
          className={`border ${theme === 'dark' ? 'border-blue-600' : 'border-blue-400'} rounded-lg p-4`}
        >
          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
            Okno ładowania
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {formatDate(result.startDate)}
                {!isSameDay && ` - ${formatDate(result.endDate)}`}
              </p>
              <p
                className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
              >
                {result.startTime} - {result.endTime}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`border ${theme === 'dark' ? 'border-blue-600' : 'border-blue-400'} rounded-lg p-4`}
        >
          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
            Średni udział czystej energii
          </p>
          <p
            className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`}
          >
            {result.cleanEnergyPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
