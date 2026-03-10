import { createContext } from "react";
import type { ColorModeContextType } from "@/types";

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

export default ColorModeContext;
