import type { OptimalChargingWindow } from '../types/types';
import { formatDate } from '../utils/date';

interface ChargingResultProps {
  result: OptimalChargingWindow;
}

export const ChargingResult = ({ result }: ChargingResultProps) => {
  const isSameDay = result.startDate === result.endDate;

  return (
    <div className="bg-slate-700 rounded-lg shadow-md p-6 border-2 border-green-200">
      <h3 className="text-xl font-semibold text-slate-300 mb-4">Wynik optymalizacji</h3>
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-slate-300 mb-1">Początek ładowania</p>
          <p className="text-lg font-semibold text-slate-300">{formatDate(result.startDate)}</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{result.startTime}</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-slate-300 mb-1">Koniec ładowania</p>
          {!isSameDay && (
            <p className="text-lg font-semibold text-gray-800">{formatDate(result.endDate)}</p>
          )}
          <p className="text-2xl font-bold text-blue-600 mt-1">{result.endTime}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-4">
          <p className="text-sm text-slate-300 mb-1">Średni udział czystej energii</p>
          <p className="text-3xl font-bold text-green-700">
            {result.cleanEnergyPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
