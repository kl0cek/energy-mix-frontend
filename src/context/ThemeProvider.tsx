import type { ReactNode } from 'react';
import { ThemeContext } from './themeContext';
import { useTheme } from '../hooks/useTheme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
