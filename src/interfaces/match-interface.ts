export interface IMatch {
    id?: number;
    home_team_id: string;
    away_team_id: string;
    home_team_name?: string;
    away_team_name?: string;
    home_team_goals: number;
    away_team_goals: number;
    home_team_color?: string;
    away_team_color?: string;
    home_team_uri?: string;
    away_team_uri?: string;
    home_team_rating?: number;
    away_team_rating?: number;
    home_ultilization_rate?: number;
    away_ultilization_rate?: number;
    home_team_last_matches?: IMatch[];
    away_team_last_matches?: IMatch[];
    home_position?: number;
    away_position?: number;
    round_id?: number;
    status?: string;
}