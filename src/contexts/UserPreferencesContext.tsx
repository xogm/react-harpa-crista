import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeColor = "dark" | "light" | "blue" | "green" | "purple";
export type FontSize = "small" | "medium" | "large" | "extra-large";

interface UserPreferences {
  themeColor: ThemeColor;
  fontSize: FontSize;
}

interface UserPreferencesContextType extends UserPreferences {
  setThemeColor: (color: ThemeColor) => void;
  setFontSize: (size: FontSize) => void;
}

const defaultPreferences: UserPreferences = {
  themeColor: "dark",
  fontSize: "medium",
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within UserPreferencesProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const UserPreferencesProvider = ({ children }: Props) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem("userPreferences");
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const setThemeColor = (color: ThemeColor) => {
    setPreferences((prev) => ({ ...prev, themeColor: color }));
  };

  const setFontSize = (size: FontSize) => {
    setPreferences((prev) => ({ ...prev, fontSize: size }));
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        ...preferences,
        setThemeColor,
        setFontSize,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
