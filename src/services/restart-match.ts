import { MatchInterface, TournamentTeamInterface } from "../interfaces";

export default function restartMatch(match: MatchInterface, home_team: TournamentTeamInterface, away_team: TournamentTeamInterface, victory_points: number, draw_points: number, lose_points: number) {
    home_team.matches_played--;
    away_team.matches_played--;

    if (match.home_team_goals > match.away_team_goals) {
        home_team.victories--;
        home_team.goals_for -= match.home_team_goals;
        home_team.goals_against -= match.away_team_goals;

        away_team.losses--;
        away_team.goals_for -= match.away_team_goals;
        away_team.goals_against -= match.home_team_goals;

        home_team.goals_difference = home_team.goals_for - home_team.goals_against;
        away_team.goals_difference = away_team.goals_for - away_team.goals_against;

        home_team.points -= victory_points;
        away_team.points -= lose_points;
    } else if (match.home_team_goals < match.away_team_goals) {
        away_team.victories--;
        away_team.goals_for -= match.away_team_goals;
        away_team.goals_against -= match.home_team_goals;

        home_team.losses--;
        home_team.goals_for -= match.home_team_goals;
        home_team.goals_against -= match.away_team_goals;

        away_team.goals_difference = away_team.goals_for - away_team.goals_against;
        home_team.goals_difference = home_team.goals_for - home_team.goals_against;

        away_team.points -= victory_points;
        home_team.points -= lose_points;
    } else {
        home_team.draws--;
        home_team.goals_for -= match.home_team_goals;
        home_team.goals_against -= match.away_team_goals;

        away_team.draws--;
        away_team.goals_for -= match.away_team_goals;
        away_team.goals_against -= match.home_team_goals;

        home_team.goals_difference = home_team.goals_for - home_team.goals_against;
        away_team.goals_difference = away_team.goals_for - away_team.goals_against;

        home_team.points -= draw_points;
        away_team.points -= draw_points;
    }

    home_team.ultilization_rate = Math.floor(home_team.points / ((home_team.matches_played === 0 ? 1 : home_team.matches_played) * 3) * 100);
    away_team.ultilization_rate = Math.floor(away_team.points / ((away_team.matches_played === 0 ? 1 : away_team.matches_played) * 3) * 100);

    return { home_team, away_team };
}