import { useEffect, useState } from 'react';
import type { DailyEnergyMix, OptimalChargingWindow } from './types/types';
import { fetchEnergyMix, fetchOptimalCharging } from './services/apiClient';
import {
  EnergyChart,
  ChargingForm,
  ErrorMessage,
  ChargingResult,
  Loading,
} from './components/index';

export const App = () => {
  const [energyData, setEnergyData] = useState<DailyEnergyMix[]>([]);
  const [chargingWindow, setChargingWindow] = useState<OptimalChargingWindow | null>(null);
  const [isLoadingEnergy, setIsLoadingEnergy] = useState(true);
  const [isLoadingCharging, setIsLoadingCharging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEnergyData();
  }, []);

  const loadEnergyData = async () => {
    try {
      setIsLoadingEnergy(true);
      setError(null);
      const data = await fetchEnergyMix();
      setEnergyData(data);
    } catch (err) {
      setError('Nie udało się pobrać danych o miksie energetycznym');
      console.error(err);
    } finally {
      setIsLoadingEnergy(false);
    }
  };

  const handleChargingSubmit = async (duration: number) => {
    try {
      setIsLoadingCharging(true);
      setError(null);
      const result = await fetchOptimalCharging(duration);
      setChargingWindow(result);
    } catch (err) {
      setError('Nie udało się obliczyć optymalnego okna ładowania');
      console.error(err);
    } finally {
      setIsLoadingCharging(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-center text-slate-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-200 mb-2">Miks Energetyczny UK</h1>
          <p className="text-slate-200">
            Analiza miksu energetycznego i optymalizacja ładowania pojazdów elektrycznych
          </p>
        </header>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {isLoadingEnergy ? (
          <Loading />
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-200 mb-6">
                Prognozy miksu energetycznego
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {energyData.map((dayData) => (
                  <EnergyChart key={dayData.date} data={dayData} />
                ))}
                {energyData.length < 3 && (
                  <div className="bg-sky-950 rounded-lg shadow-md p-6 flex  justify-center min-h-[300px]">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Pojutrze</h3>
                      <p className="text-sm mt-2">Brak danych prognostycznych</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="mb-12 flex flex-col items-center gap-6">
              <div className="md:w-[66%]">
                <ChargingForm onSubmit={handleChargingSubmit} isLoading={isLoadingCharging} />
              </div>
              {chargingWindow && (
                <div className="md:w-[66%]">
                  <ChargingResult result={chargingWindow} />
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};
