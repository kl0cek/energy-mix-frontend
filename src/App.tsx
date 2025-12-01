import { useEnergyData } from './hooks/useEnergyData';
import { useChargingOptimization } from './hooks/useChargingOptimization';
import { useThemeContext } from './hooks/useThemeContext';
import { Sun, Moon } from 'lucide-react';
import { getDayLabels } from './utils/date';
import {
  EnergyChart,
  ChargingForm,
  ErrorMessage,
  ChargingResult,
  Loading,
} from './components/index';

export const App = () => {
  const { energyData, isLoading: isLoadingEnergy, error: energyError } = useEnergyData();
  const {
    result,
    isLoading: isLoadingCharging,
    error: chargingError,
    calculate,
  } = useChargingOptimization();
  const { theme, toggleTheme } = useThemeContext();

  const error = energyError || chargingError;

  const dayLabels = getDayLabels();

  return (
    <div
      className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'} text-center`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 right-0 flex gap-2">
            <p className={` p-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-700'}`}>
              {' '}
              Change theme{' '}
            </p>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-sky-950 text-slate-200' : 'bg-white text-gray-800 shadow'}`}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
          <h1
            className={`text-4xl font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'} mb-2`}
          >
            Miks Energetyczny UK
          </h1>
          <p className={theme === 'dark' ? 'text-slate-200' : 'text-gray-700'}>
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
              <h2
                className={`text-2xl font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'} mb-6`}
              >
                Prognozy miksu energetycznego
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {dayLabels.map((day) => {
                  const dayData = energyData.find((d) => d.date === day.date);

                  if (dayData) {
                    return <EnergyChart key={day.date} data={dayData} />;
                  }

                  return (
                    <div
                      key={day.date}
                      className={`${theme === 'dark' ? 'bg-sky-950' : 'bg-white shadow-md'} rounded-lg p-6 flex items-center justify-center min-h-[300px]`}
                    >
                      <div className="text-center">
                        <h3
                          className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}
                        >
                          {day.label}
                        </h3>
                        <p
                          className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                        >
                          Brak danych prognostycznych
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-12 flex flex-col items-center gap-6">
              <div className="md:w-[66%]">
                <ChargingForm onSubmit={calculate} isLoading={isLoadingCharging} />
              </div>
              {result && (
                <div className="md:w-[66%]">
                  <ChargingResult result={result} />
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};
