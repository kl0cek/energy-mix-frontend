import { createContext } from 'react';
import { useTheme } from '../hooks/useTheme';

export const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null);
