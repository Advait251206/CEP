import { createContext, useContext, useState, type ReactNode } from 'react';

type ThemeType = 'anandwan' | 'govigyan';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('theme');
    const path = window.location.pathname;
    
    // URL takes precedence on hard navigation to specific brand
    if (path.startsWith('/govigyan')) return 'govigyan';
    if (path.startsWith('/anandwan')) return 'anandwan';
    
    // Otherwise fallback to saved preference or default
    return (saved as ThemeType) || 'anandwan';
  });
  
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, animationsEnabled, toggleAnimations }}>
      <div className={`theme-${theme} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
