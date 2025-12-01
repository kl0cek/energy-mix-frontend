import { useThemeContext } from '../context/themeContext';

export const Loading = () => {
  const { theme } = useThemeContext();
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className={`mt-4 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>Ładowanie danych...</p>
      </div>
    </div>
  );
};
