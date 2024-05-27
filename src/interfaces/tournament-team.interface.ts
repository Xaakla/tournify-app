export interface ITournamentTeam {
    id: number;
    tournament_id: number;
    team_id: string;
    name: string;
    color: string;
    points: number;
    goals_for: number;
    goals_against: number;
    goals_difference: number;
    victories: number;
    losses: number;
    draws: number;
    ultilization_rate: number;
    matches_played: number;
    uri: string;
}