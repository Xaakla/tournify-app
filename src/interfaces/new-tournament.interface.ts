import {ITeam} from "./team.interface";
import {IStandingsZone} from "./standings-zone.interface";

export interface INewTournament {
    name: string;
    teamsQuantity: number;
    roundsQuantity: number;
    teams: ITeam[];
    teamsIds: string[];
    trip: string;
    mode: string;
    victoryPoints: number;
    drawPoints: number;
    losePoints: number;
    standingsZone: IStandingsZone[];
    uri: string;
}