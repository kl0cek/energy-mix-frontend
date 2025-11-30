import type { ChartOptions } from 'chart.js';

export const FUEL_COLORS: Record<string, string> = {
  biomass: '#10b981',
  coal: '#374151',
  imports: '#8b5cf6',
  gas: '#ef4444',
  nuclear: '#3b82f6',
  other: '#6b7280',
  hydro: '#06b6d4',
  solar: '#f59e0b',
  wind: '#14b8a6',
};

export const PIE_CHART_OPTIONS: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 12,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          return `${label}: ${value.toFixed(2)}%`;
        },
      },
    },
  },
};
