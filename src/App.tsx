import { useState } from 'react';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading } from './components/Loading';

export const App = () => {
  const [isLoadingEnergy, setIsLoadingEnergy] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-700 text-slate-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Miks Energetyczny UK
          </h1>
          <p className="">
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
              <h2 className="text-2xl font-bold mb-6">
                Prognozy miksu energetycznego
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            </section>
          </>
        )}
      </div>
    </div>
  );
};
