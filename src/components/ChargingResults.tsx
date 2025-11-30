import type { OptimalChargingWindow } from '../types/types';
import { formatDate } from '../utils/date';

interface ChargingResultProps {
  result: OptimalChargingWindow;
}

export const ChargingResult = ({ result }: ChargingResultProps) => {
  const isSameDay = result.startDate === result.endDate;
  
  return (
    <div className="bg-sky-950 text-slate-200 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Wynik optymalizacji</h3>
      
      <div className="space-y-3">
        <div className="border border-blue-600 rounded-lg p-4">
          <p className="text-sm mb-1">Okno ładowania</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {formatDate(result.startDate)}
                {!isSameDay && ` - ${formatDate(result.endDate)}`}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {result.startTime} - {result.endTime}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-blue-600 rounded-lg p-4">
          <p className="text-sm mb-1">Średni udział czystej energii</p>
          <p className="text-3xl font-bold text-green-700">
            {result.cleanEnergyPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
