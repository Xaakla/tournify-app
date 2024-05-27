import {ITheme} from "./theme.interface";

export interface IGlobalContext {
    theme: ITheme;
    setTheme: Function;
    toggleTheme(): void;
}