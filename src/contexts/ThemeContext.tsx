import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextValue {
  toggleTheme: () => void;
  currentTheme: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextValue);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState('theme-light');

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    setCurrentTheme(themeName);
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
      setTheme('theme-light');
    } else {
      setTheme('theme-dark');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  }, []);

  const valueProvider: ThemeContextValue = {
    toggleTheme,
    currentTheme
  }

  return (
    <ThemeContext.Provider value={valueProvider}>
      {children}
    </ThemeContext.Provider>
  )
}