import React, { createContext, useState } from "react";
import { IGlobalContext } from "../interfaces/global-context.interface";

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import { ThemeProvider } from "styled-components";

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export function GlobalProvider({ children }) {
    const [theme, setTheme] = useState(light);
    function toggleTheme() { setTheme(theme.title === 'light' ? dark : light); }

    return (
        <GlobalContext.Provider value={{
            theme, setTheme, toggleTheme
        }}>
            <ThemeProvider theme={theme}>
                { children }
            </ThemeProvider>
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
