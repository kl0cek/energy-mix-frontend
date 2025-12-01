import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { DailyEnergyMix } from '../types/types';
import { FUEL_COLORS, PIE_CHART_OPTIONS } from '../utils/chart';
import { getDayLabel } from '../utils/date';
import { useThemeContext } from '../context/themeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EnergyChartProps {
  data: DailyEnergyMix;
}

export const EnergyChart = ({ data }: EnergyChartProps) => {
  const { theme } = useThemeContext();
  
  const chartData = {
    labels: data.generationmix.map((item) => item.fuel),
    datasets: [
      {
        data: data.generationmix.map((item) => item.perc),
        backgroundColor: data.generationmix.map((item) => FUEL_COLORS[item.fuel] || '#6b7280'),
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#fff' : '#e5e7eb',
      },
    ],
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-sky-950 text-slate-200' : 'bg-white text-gray-900'} rounded-lg shadow-md p-6`}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">{getDayLabel(data.date)}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>Czysta energia:</span>
          <span className={`text-lg font-bold ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`}>
            {data.cleanEnergyPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto">
        <Pie data={chartData} options={PIE_CHART_OPTIONS} />
      </div>
    </div>
  );
};
