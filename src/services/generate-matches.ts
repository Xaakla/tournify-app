import { TeamInterface, MatchInterface, RoundInterface } from "../interfaces";

class Tournament {
    matchesPerRound: number;
    roundCount: number;
    rounds: RoundInterface[] = [];

    constructor(roundCount: number, matchesPerRound: number) {
        this.matchesPerRound = matchesPerRound;
        this.roundCount = roundCount;
        for (let i = 0; i < roundCount; i++) {
            // @ts-ignore
          this.rounds.push({
                matches: []
            });
        }
    }
}

export default function generateMatches(teams: TeamInterface[], rounds_quantity: number, trip: string, teams_quantity: number) {
    let tournament: Tournament = new Tournament(rounds_quantity, teams_quantity / 2);

    // Loop through all rounds
    for (let i = 0; i < tournament.roundCount; i++) {

        let { nextHomeTeam, nextAwayTeam } = verifyTrip(trip, i, tournament.roundCount, tournament, teams[0], teams[1]);

        tournament.rounds[i].matches.push({
            // id: '_' + Math.random().toString(36).substr(2, 9),
            home_team_id: nextHomeTeam.id,
            away_team_id: nextAwayTeam.id,
            home_team_goals: 0,
            away_team_goals: 0,
            status: 'start'
        });

        for (let j = 1; j < tournament.matchesPerRound; j++) {

            let { nextHomeTeam, nextAwayTeam } = verifyTrip(trip, i, tournament.roundCount, tournament, teams[1 + j], teams[teams.length - j]);

            tournament.rounds[i].matches.push({
                // id: '_' + Math.random().toString(36).substr(2, 9),
                home_team_id: nextHomeTeam.id,
                away_team_id: nextAwayTeam.id,
                home_team_goals: 0,
                away_team_goals: 0,
                status: 'start'
            });
        }

        let cycle = new Array(teams.length);
        teams.forEach( (team, index) => {
            if (index === 0) {
                cycle[0] = team;

            }
            else if (index >= teams.length - 1) {
                cycle[1] = team;
            }
            else {
                cycle[index + 1] = team;
            }
        })
        teams = cycle;
    }

    return tournament.rounds;
}

function verifyTrip(
    trip: string, actuallyRound: number, roundCount: number,
    tournament: Tournament, teamOne: TeamInterface, teamTwo: TeamInterface
) {
    let roundsPerTrip = trip === 'turn' ? roundCount : roundCount / 2;

    if (trip === 'turn') {
        return orderHomeAndAwayTeamsTurn(tournament, actuallyRound, teamOne, teamTwo);
    } else {
        if (actuallyRound > roundsPerTrip - 1) {
            return orderHomeAndAwayTeamsReturn(roundsPerTrip, actuallyRound, tournament, teamOne, teamTwo);
        } else {
            return orderHomeAndAwayTeamsTurn(tournament, actuallyRound, teamOne, teamTwo);
        }
    }
}

function orderHomeAndAwayTeamsReturn(roundsPerTrip: number, actuallyRound: number, tournament: Tournament, teamOne: TeamInterface, teamTwo: TeamInterface) {
    let lastMatch: MatchInterface;
    let nextHomeTeam: TeamInterface = teamOne;
    let nextAwayTeam: TeamInterface = teamTwo;

    lastMatch = tournament.rounds[ actuallyRound - roundsPerTrip ].matches
    .filter(
        match =>
            match.home_team_id === teamOne.id ||
            match.away_team_id === teamOne.id &&
            match.home_team_id === teamTwo.id ||
            match.away_team_id === teamTwo.id
    )[0];

    if (lastMatch.home_team_id === teamOne.id) {
        nextHomeTeam = teamTwo;
        nextAwayTeam = teamOne;
    } else {
        nextHomeTeam = teamOne;
        nextAwayTeam = teamTwo;
    }

    return { nextHomeTeam, nextAwayTeam };
}

function orderHomeAndAwayTeamsTurn(tournament: Tournament, actuallyRound: number, teamOne: TeamInterface, teamTwo: TeamInterface) {
    const emptyMatch: MatchInterface = {
        home_team_id: '',
        home_team_goals: 0,
        away_team_id: '',
        away_team_goals: 0
    };

    let teamOneLastMatch: MatchInterface, teamTwoLastMatch: MatchInterface,
        teamOnePenultimateMatch: MatchInterface = emptyMatch, teamTwoPenultimateMatch: MatchInterface = emptyMatch,
        teamOneAntiPenultimateMatch: MatchInterface = emptyMatch, teamTwoAntiPenultimateMatch: MatchInterface = emptyMatch;
    let nextHomeTeam: TeamInterface = teamOne;
    let nextAwayTeam: TeamInterface = teamTwo;

    if (actuallyRound > 0) {
        teamOneLastMatch = tournament.rounds[ actuallyRound - 1 ].matches
            .filter(
                match =>
                    match.home_team_id === teamOne.id ||
                    match.away_team_id === teamOne.id
            )[0];

        teamTwoLastMatch = tournament.rounds[ actuallyRound - 1 ].matches
            .filter(
                match =>
                    match.home_team_id === teamTwo.id ||
                    match.away_team_id === teamTwo.id
            )[0];

        if (actuallyRound > 1) {
            teamOnePenultimateMatch = tournament.rounds[ actuallyRound - 2 ].matches
                .filter(
                    match =>
                        match.home_team_id === teamOne.id ||
                        match.away_team_id === teamOne.id
                )[0];

            teamTwoPenultimateMatch = tournament.rounds[ actuallyRound - 2 ].matches
                .filter(
                    match =>
                        match.home_team_id === teamTwo.id ||
                        match.away_team_id === teamTwo.id
                )[0];
        }

        if (actuallyRound > 2) {
            teamOneAntiPenultimateMatch = tournament.rounds[ actuallyRound - 3 ].matches
                .filter(
                    match =>
                        match.home_team_id === teamOne.id ||
                        match.away_team_id === teamOne.id
                )[0];

            teamTwoAntiPenultimateMatch = tournament.rounds[ actuallyRound - 3 ].matches
                .filter(
                    match =>
                        match.home_team_id === teamTwo.id ||
                        match.away_team_id === teamTwo.id
                )[0];
        }

        if (teamOneLastMatch.home_team_id === teamOne.id) {
            if (teamTwoLastMatch.home_team_id === teamTwo.id) {
                if (actuallyRound > 1) {
                    if (teamOnePenultimateMatch.home_team_id === teamOne.id) {
                        if (teamTwoPenultimateMatch.home_team_id === teamTwo.id) {
                            if (actuallyRound > 2) {
                                if (teamOneAntiPenultimateMatch.home_team_id === teamOne.id) {
                                    if (teamTwoAntiPenultimateMatch.home_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamTwo;
                                        nextAwayTeam = teamOne;
                                    }
                                } else {
                                    if (teamTwoAntiPenultimateMatch.away_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamOne;
                                        nextAwayTeam = teamTwo;
                                    }
                                }
                            } else {
                                let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                nextHomeTeam = results.nextHomeTeam;
                                nextAwayTeam = results.nextAwayTeam;
                            }
                        } else {
                            nextHomeTeam = teamTwo;
                            nextAwayTeam = teamOne;
                        }
                    } else {
                        if (teamTwoPenultimateMatch.away_team_id === teamTwo.id) {
                            if (actuallyRound > 2) {
                                if (teamOneAntiPenultimateMatch.home_team_id === teamOne.id) {
                                    if (teamTwoAntiPenultimateMatch.home_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamTwo;
                                        nextAwayTeam = teamOne;
                                    }
                                } else {
                                    if (teamTwoAntiPenultimateMatch.away_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamOne;
                                        nextAwayTeam = teamTwo;
                                    }
                                }
                            } else {
                                let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                nextHomeTeam = results.nextHomeTeam;
                                nextAwayTeam = results.nextAwayTeam;
                            }
                        } else {
                            nextHomeTeam = teamOne;
                            nextAwayTeam = teamTwo;
                        }
                    }
                } else {
                    let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                    nextHomeTeam = results.nextHomeTeam;
                    nextAwayTeam = results.nextAwayTeam;
                }
            } else {
                nextHomeTeam = teamTwo;
                nextAwayTeam = teamOne;
            }
        } else {
            if (teamTwoLastMatch.away_team_id === teamTwo.id) {
                if (actuallyRound > 1) {
                    if (teamOnePenultimateMatch.home_team_id === teamOne.id) {
                        if (teamTwoPenultimateMatch.home_team_id === teamTwo.id) {
                            if (actuallyRound > 2) {
                                if (teamOneAntiPenultimateMatch.home_team_id === teamOne.id) {
                                    if (teamTwoAntiPenultimateMatch.home_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamTwo;
                                        nextAwayTeam = teamOne;
                                    }
                                } else {
                                    if (teamTwoAntiPenultimateMatch.away_team_id === teamTwo.id) {
                                        let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                        nextHomeTeam = results.nextHomeTeam;
                                        nextAwayTeam = results.nextAwayTeam;
                                    } else {
                                        nextHomeTeam = teamOne;
                                        nextAwayTeam = teamTwo;
                                    }
                                }
                            } else {
                                let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                                nextHomeTeam = results.nextHomeTeam;
                                nextAwayTeam = results.nextAwayTeam;
                            }
                        } else {
                            nextHomeTeam = teamTwo;
                            nextAwayTeam = teamOne;
                        }
                    } else {
                        if (teamTwoPenultimateMatch.away_team_id === teamTwo.id) {
                            let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                            nextHomeTeam = results.nextHomeTeam;
                            nextAwayTeam = results.nextAwayTeam;
                        } else {
                            nextHomeTeam = teamOne;
                            nextAwayTeam = teamTwo;
                        }
                    }
                } else {
                    let results = orderDraw(nextHomeTeam, nextAwayTeam, teamOne, teamTwo);
                    nextHomeTeam = results.nextHomeTeam;
                    nextAwayTeam = results.nextAwayTeam;
                }
            } else {
                nextHomeTeam = teamOne;
                nextAwayTeam = teamTwo;
            }
        }
    }

    return { nextHomeTeam, nextAwayTeam };
}

function orderDraw(nextHomeTeam: TeamInterface, nextAwayTeam: TeamInterface, teamOne: TeamInterface, teamTwo: TeamInterface) {
    let orderDraw: number = Math.floor(Math.random() * 2);

    if (orderDraw === 0) {
        nextHomeTeam = teamOne;
        nextAwayTeam = teamTwo;
    } else {
        nextHomeTeam = teamOne;
        nextAwayTeam = teamTwo;
    }

    return { nextHomeTeam, nextAwayTeam };
}
