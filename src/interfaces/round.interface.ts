import {IMatch} from "./match-interface";

export interface IRound {
    id?: number;
    tournament_id: number;
    matches: IMatch[];
}