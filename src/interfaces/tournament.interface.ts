import {IMatch} from "./match-interface";
import {IStandingsZone} from "./standings-zone.interface";

export interface ITournament {
    id: number;
    name: string;
    teamsQuantity: number;
    roundsQuantity: number;
    trip: string;
    mode: string;
    matches?: IMatch[];
    victory_points: number;
    draw_points: number;
    lose_points: number;
    standings_zone: IStandingsZone[];
    uri: string;
}