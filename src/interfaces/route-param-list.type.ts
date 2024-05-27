import {ITournament} from "./tournament.interface";
import {IMatch} from "./match-interface";
import {ITeam} from "./team.interface";

export type RouteParamList = {
    Authentication: undefined;
    App: undefined;

    NewTournament: undefined;
    Tournaments: undefined;
    Tournament: {
        tournament: ITournament;
    };
    Table: {
        tournament: ITournament;
    };
    Matchday: {
        tournament: ITournament;
    };
    Match: {
        match: IMatch;
        matchday: number;
        tournament: ITournament;
    };
    NewTeam: undefined;
    Teams: undefined;
    EditTeam: {
        team: ITeam;
    };
    Settings: undefined;
    ListGroups: undefined;
    NewEditGroup: undefined;
};