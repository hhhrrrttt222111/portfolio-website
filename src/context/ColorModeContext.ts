import { createContext } from "react";

interface ColorModeContextType {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

export default ColorModeContext;
