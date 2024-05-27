import React, { useEffect, useState, useContext } from "react";
import TournamentTeamService from "../../../../services/tournament-team-service";
import {
  Table,
  Position,
  NPosition,
  TeamName,
  Matches,
  Goals,
  GoalsD,
  Points,
  VDL,
  ZoneContainer,
  ZoneBox,
  ZoneColor,
  ZoneLabel,
} from "../styles";
import { MainScrollView, TeamImage } from "../../../../styles/global";
import GlobalContext from "../../../../context";
import {RouteStackParamList} from "../../../../interfaces/route-stack-param-list.type";
import {ITournament} from "../../../../interfaces/tournament.interface";
import {ITournamentTeam} from "../../../../interfaces/tournament-team.interface";

export default function TablePage({
  navigation,
  route,
}: RouteStackParamList<"Table">) {
  const [tournament, setTournament] = useState<ITournament>({
    id: 0,
    name: "",
    mode: "",
    teamsQuantity: 0,
    roundsQuantity: 0,
    trip: "",
    victory_points: 0,
    draw_points: 0,
    lose_points: 0,
    standings_zone: [],
    uri: "",
  });
  const [teams, setTeams] = useState<ITournamentTeam[]>([]);

  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setTournament({
        id: route.params.tournament.id,
        name: route.params.tournament.name,
        teamsQuantity: route.params.tournament.teamsQuantity,
        roundsQuantity: route.params.tournament.roundsQuantity,
        trip: route.params.tournament.trip,
        mode: route.params.tournament.mode,
        victory_points: route.params.tournament.victory_points,
        draw_points: route.params.tournament.draw_points,
        lose_points: route.params.tournament.lose_points,
        standings_zone: JSON.parse(
          route.params.tournament.standings_zone.toString()
        ),
        uri: route.params.tournament.uri,
      });

      TournamentTeamService.findTeamsByTournament(route.params.tournament.id)
        .then((response: any) => {
          setTeams(response._array);
        })
        .catch((err) => console.error("Error trying list teams", err));
    });
  }, []);

  return (
    <MainScrollView>
      <Table>
        <Position>
          <NPosition></NPosition>
          <TeamName></TeamName>
          <Matches>P</Matches>
          <VDL>V</VDL>
          <VDL>D</VDL>
          <VDL>L</VDL>
          <Goals>Goals</Goals>
          <GoalsD>GD</GoalsD>
          <Points>Pts</Points>
        </Position>
        {teams.map((team: ITournamentTeam, index) => {
          let color: string = theme.colors.secondary_text_color;
          if (tournament.standings_zone.length > 0) {
            tournament.standings_zone.forEach((zone) => {
              if (index + 1 >= zone.from && index + 1 <= zone.to)
                color = zone.color;
            });
          }

          return (
            <Position key={team.team_id}>
              <NPosition color={color}>{index + 1}</NPosition>
              <TeamImage
                source={{ uri: team.uri }}
                width={25}
                height={25}
                ml={4}
                mr={8}
              />
              <TeamName>{team.name}</TeamName>
              <Matches>{team.matches_played}</Matches>
              <VDL>{team.victories}</VDL>
              <VDL>{team.draws}</VDL>
              <VDL>{team.losses}</VDL>
              <Goals>
                {team.goals_for}:{team.goals_against}
              </Goals>
              <GoalsD>{team.goals_difference}</GoalsD>
              <Points>{team.points}</Points>
            </Position>
          );
        })}
      </Table>
      <ZoneContainer>
        {tournament.standings_zone.map((zone, index) => (
          <ZoneBox key={zone.label + index}>
            <ZoneColor color={zone.color}></ZoneColor>
            <ZoneLabel>{zone.label}</ZoneLabel>
          </ZoneBox>
        ))}
      </ZoneContainer>
    </MainScrollView>
  );
}
