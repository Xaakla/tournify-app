import { TournamentTeamInterface } from './../interfaces';

export default function findTeamPosition(teams: TournamentTeamInterface[], team_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_id === team_id) resolve(i + 1);
        }

        reject('Could not find the team position');
    });
}
