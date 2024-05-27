import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import findTeamPosition from "../../../../../services/find-team-position";
import restartMatch from "../../../../../services/restart-match";
import TournamentService from "../../../../../services/tournament-service";
import TournamentTeamService from "../../../../../services/tournament-team-service";
import verifyMatchResults from "../../../../../services/verify-match-results";

import {
  Container,
  Header,
  Icon1,
  Icon2,
  Icon3,
  MainScrollView,
  PageTitle,
  TeamImage,
} from "../../../../../styles/global";
import {
  MatchBoard,
  MatchBoardTeam,
  MatchBoardTeamName,
  StartMatchButton,
  StartMatchButtonLabel,
  MatchBoardGoalsInput,
  MatchBoardGoalsView,
  MatchBoardVS,
  MatchFacts,
  MatchFactsRow,
  MatchFactsValue,
  MatchFactsLabel,
  MatchFactsL5MView,
  MatchFactsL5M
} from "./styles";
import {RouteStackParamList} from "../../../../../interfaces/route-stack-param-list.type";
import {IMatch} from "../../../../../interfaces/match-interface";
import {ITournamentTeam} from "../../../../../interfaces/tournament-team.interface";

export default function MatchPage({
  navigation,
  route,
}: RouteStackParamList<"Match">) {
  const emptyMatch: IMatch = {
    home_team_id: "",
    home_team_goals: 0,
    away_team_id: "",
    away_team_goals: 0,
    home_ultilization_rate: 0,
    away_ultilization_rate: 0,
  };
  const [tournament, setTournament] = useState(route.params.tournament);
  const [teams, setTeams] = useState<ITournamentTeam[]>([]);
  const [match, setMatch] = useState<IMatch>(route.params.match);
  const [canSave, setCanSave] = useState<boolean>(true);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  useEffect(() => {
    TournamentTeamService.findTeamsByTournament(route.params.tournament.id)
      .then(async (response: any) => {
        setTeams(response._array);
        const home_position = await findTeamPosition(
          response._array,
          match.home_team_id
        );
        const away_position = await findTeamPosition(
          response._array,
          match.away_team_id
        );

        // console.log('match', match);

        setMatch({ ...match, home_position, away_position });
      })
      .catch((err) => console.error("Error trying get teams", err));
  }, []);

  function handleSaveMatch(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const home_position = await findTeamPosition(teams, match.home_team_id);
      const away_position = await findTeamPosition(teams, match.away_team_id);
      const homeTeam = teams.filter(
        (team: ITournamentTeam) => team.team_id === match.home_team_id
      )[0];
      const awayTeam = teams.filter(
        (team: ITournamentTeam) => team.team_id === match.away_team_id
      )[0];

      let { home_team, away_team } = verifyMatchResults(
        match,
        homeTeam,
        awayTeam,
        tournament.victory_points,
        tournament.draw_points,
        tournament.lose_points
      );

      await TournamentService.updateMatch({
        ...match,
        home_position,
        away_position,
        status: "fulltime",
      });
      await TournamentTeamService.saveStandings(home_team);
      await TournamentTeamService.saveStandings(away_team);

      setCanSave(false);

      return resolve(true);
    });
  }

  function handleRestartMatch(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await TournamentService.updateMatch({
        ...match,
        status: "start",
        home_team_goals: 0,
        away_team_goals: 0,
      });
      let homeTeam: ITournamentTeam = teams.filter(
        (team) => team.team_id === match.home_team_id
      )[0];
      let awayTeam: ITournamentTeam = teams.filter(
        (team) => team.team_id === match.away_team_id
      )[0];
      let { home_team, away_team } = restartMatch(
        match,
        homeTeam,
        awayTeam,
        tournament.victory_points,
        tournament.draw_points,
        tournament.lose_points
      );

      setMatch({
        ...match,
        home_team_goals: 0,
        away_team_goals: 0,
        status: "start",
      });

      await TournamentTeamService.saveStandings(home_team);
      await TournamentTeamService.saveStandings(away_team);

      setCanSave(false);

      return resolve(true);
    });
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PageTitle textAlign="center">
          Matchday {route.params.matchday + 1}
        </PageTitle>
        <TouchableOpacity>
          {match.status === "start" && (
            <TouchableOpacity
              onPress={() => {
                setMatch({ ...match, status: "playing" });
                setCanSave(true);
              }}
            >
              <Icon3 name="play" size={24} />
            </TouchableOpacity>
          )}
          {match.status === "playing" && (
            <TouchableOpacity
              onPress={() => {
                if (canSave)
                  handleSaveMatch().then((response: boolean) => {
                    if (response) return navigation.goBack();
                    else return alert("Error trying save match");
                  });
              }}
            >
              <Icon3 name="save" size={24} />
            </TouchableOpacity>
          )}
          {match.status === "fulltime" && (
            <TouchableOpacity
              onPress={() => {
                if (canSave)
                  handleRestartMatch().then((response: boolean) => {
                    if (!response) return alert("Error trying restart match");
                  });
              }}
            >
              <Icon2 name="restart" size={24} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Header>

      <MainScrollView>
        <MatchBoard>
          <MatchBoardTeam>
            <TeamImage
              source={{ uri: match.home_team_uri }}
              width={50}
              height={50}
              ml={2}
              mr={8}
              mb={8}
            />
            <MatchBoardTeamName side="left" color={match.home_team_color}>
              {match.home_team_name}
            </MatchBoardTeamName>
          </MatchBoardTeam>
          {match.status === "start" && (
            <StartMatchButton
              onPress={() => {
                setMatch({ ...match, status: "playing" });
                setCanSave(true);
              }}
            >
              <StartMatchButtonLabel>START</StartMatchButtonLabel>
            </StartMatchButton>
          )}
          {match.status === "playing" && (
            <>
              <MatchBoardGoalsInput
                keyboardType="numeric"
                maxLength={3}
                value={String(match.home_team_goals)}
                onChangeText={(text) => {
                  if (text === "") text = 0;
                  setMatch({ ...match, home_team_goals: parseInt(text) });
                }}
              />
              <MatchBoardVS>:</MatchBoardVS>
              <MatchBoardGoalsInput
                keyboardType="numeric"
                value={String(match.away_team_goals)}
                onChangeText={(text) => {
                  if (text === "") text = 0;
                  setMatch({ ...match, away_team_goals: parseInt(text) });
                }}
              />
            </>
          )}
          {match.status === "fulltime" && (
            <>
              <MatchBoardGoalsView>{match.home_team_goals}</MatchBoardGoalsView>
              <MatchBoardVS>:</MatchBoardVS>
              <MatchBoardGoalsView>{match.away_team_goals}</MatchBoardGoalsView>
            </>
          )}

          <MatchBoardTeam>
            <TeamImage
              source={{ uri: match.away_team_uri }}
              width={50}
              height={50}
              ml={2}
              mr={8}
              mb={8}
            />
            <MatchBoardTeamName side="left" color={match.away_team_color}>
              {match.away_team_name}
            </MatchBoardTeamName>
          </MatchBoardTeam>
        </MatchBoard>

        <MatchFacts mt={24}>
          <MatchFactsRow>
            <MatchFactsValue>{match.home_position}°</MatchFactsValue>
            <MatchFactsLabel>Position</MatchFactsLabel>
            <MatchFactsValue>{match.away_position}°</MatchFactsValue>
          </MatchFactsRow>
          <MatchFactsRow>
            <MatchFactsValue>
              {match.home_team_rating} <Icon1 name={"star"} size={18} />
            </MatchFactsValue>
            <MatchFactsLabel>Stars Rating</MatchFactsLabel>
            <MatchFactsValue>
              <Icon1 name={"star"} size={18} /> {match.away_team_rating}
            </MatchFactsValue>
          </MatchFactsRow>
          <MatchFactsRow>
            <MatchFactsValue>{match.home_ultilization_rate}%</MatchFactsValue>
            <MatchFactsLabel>Utilization Rate</MatchFactsLabel>
            <MatchFactsValue>{match.away_ultilization_rate}%</MatchFactsValue>
          </MatchFactsRow>
          <MatchFactsRow>
            <MatchFactsL5MView>
              {match.home_team_last_matches?.map((match, index) => {
                return (
                  <MatchFactsL5M key={index + match.home_team_id}>
                    <MatchBoard>
                      <MatchBoardTeam>
                        <TeamImage
                          source={{ uri: match.home_team_uri }}
                          width={20}
                          height={20}
                        />
                      </MatchBoardTeam>
                      <MatchBoardGoalsView fontSize={16}>{match.home_team_goals}</MatchBoardGoalsView>
                      <MatchBoardVS fontSize={16}>:</MatchBoardVS>
                      <MatchBoardGoalsView fontSize={16}>{match.away_team_goals}</MatchBoardGoalsView>
                      <MatchBoardTeam>
                        <TeamImage
                          source={{ uri: match.away_team_uri }}
                          width={20}
                          height={20}
                        />
                      </MatchBoardTeam>
                    </MatchBoard>
                  </MatchFactsL5M>
                );
              })}
            </MatchFactsL5MView>
            {match.home_team_last_matches?.length !== undefined && match.away_team_last_matches?.length !== undefined && (
              <MatchFactsLabel>Last Matches</MatchFactsLabel>
            )}
            <MatchFactsL5MView>
              {match.away_team_last_matches?.map((match, index) => {
                return (
                  <MatchFactsL5M  key={index + match.away_team_id}>
                    <MatchBoard>
                      <MatchBoardTeam>
                        <TeamImage
                          source={{ uri: match.home_team_uri }}
                          width={20}
                          height={20}
                        />
                      </MatchBoardTeam>
                      <MatchBoardGoalsView fontSize={16}>{match.home_team_goals}</MatchBoardGoalsView>
                      <MatchBoardVS fontSize={16}>:</MatchBoardVS>
                      <MatchBoardGoalsView fontSize={16}>{match.away_team_goals}</MatchBoardGoalsView>
                      <MatchBoardTeam>
                        <TeamImage
                          source={{ uri: match.away_team_uri }}
                          width={20}
                          height={20}
                        />
                      </MatchBoardTeam>
                    </MatchBoard>
                  </MatchFactsL5M>
                );
              })}
            </MatchFactsL5MView>
          </MatchFactsRow>
        </MatchFacts>
      </MainScrollView>
    </Container>
  );
}
