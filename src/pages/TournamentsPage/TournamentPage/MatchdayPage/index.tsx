import React, { useEffect, useState } from "react";
import {
  MainScrollView,
  TeamImage,
  Icon1,
} from "../../../../styles/global";
import {
  MatchdayContainer,
  SingleMatch,
  SingleMatchLeft,
  SingleMatchRight,
  SingleMatchRightLabel,
  SingleMatchTeam,
  SingleMatchTeamName,
  SingleMatchGoals,
  SingleMatchTeamStat,
  PickerMatchdayContainer,
  PickerMatchday,
  PickerMatchdayLabel,
} from "../styles";
import TournamentService from "../../../../services/tournament-service";
import { TouchableOpacity } from "react-native-gesture-handler";
import {RouteStackParamList} from "../../../../interfaces/route-stack-param-list.type";
import {ITournament} from "../../../../interfaces/tournament.interface";
import {IRound} from "../../../../interfaces/round.interface";
import {IMatch} from "../../../../interfaces/match-interface";

export default function MatchdayPage({
  navigation,
  route,
}: RouteStackParamList<"Matchday">) {
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
  const [selectedMatchday, setSeletedMatchday] = useState<number>(0);
  const [rounds, setRounds] = useState<IRound[]>([]);
  const [matches, setMatches] = useState<IMatch[]>([]);

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

      // console.log('route', route.params.tournament);

      TournamentService.findAllRounds(route.params.tournament.id)
        .then((response: any) => {
          setRounds(response._array);

          let ids: any[] = [];
          response._array.forEach((round, index) => {
            ids.push(round.id);
          });

          TournamentService.findAllMatches(ids)
            .then((response: any) => {
              setMatches(response._array);
            })
            .catch((err) =>
              console.error("Error trying search for matches", err)
            );
        })
        .catch((err) => console.error("Error trying find all rounds", err));
    });
  }, []);

  function findLastMatches(team_id: string): IMatch[] {
    const allMatches: IMatch[] =
      matches.filter((m) => m.home_team_id === team_id || m.away_team_id === team_id);

      let lastMatches: IMatch[] = [];
      for (let i = selectedMatchday - 1; i > selectedMatchday - 5; i--) {
        if (i >= 0) {
          lastMatches.push(allMatches[i]);
        }
      }

      return lastMatches;
  }

  return (
    <MainScrollView>
      <PickerMatchdayContainer>
        <TouchableOpacity
          onPress={() => {
            if (selectedMatchday !== 0) {
              setSeletedMatchday(selectedMatchday - 1);
            }
          }}
        >
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PickerMatchday
          selectedValue={selectedMatchday}
          onValueChange={(itemValue, itemIndex) => {
            setSeletedMatchday(itemValue);
          }}
          mode="dropdown"
        >
          {rounds.map((round, index) => {
            return (
              <PickerMatchday.Item
                key={`matchday-${index + 1}`}
                label={`Matchday ${index + 1}`}
                value={index}
              />
            );
          })}
        </PickerMatchday>
        <PickerMatchdayLabel>
          Matchday {selectedMatchday + 1}
        </PickerMatchdayLabel>
        <TouchableOpacity
          onPress={() => {
            if (selectedMatchday + 1 < rounds.length) {
              setSeletedMatchday(selectedMatchday + 1);
            }
          }}
        >
          <Icon1 name="chevron-right" size={24} />
        </TouchableOpacity>
      </PickerMatchdayContainer>

      <MatchdayContainer>
        {selectedMatchday >= 0 &&
          matches
            .filter(
              (singleMatch) =>
                singleMatch.round_id === rounds[selectedMatchday].id
            )
            .map((match, index) => {
              // console.log('match', match);

              return (
                <SingleMatch
                  key={`key-${match.id}`}
                  onPress={
                    () => {
                      // findLastMatches(match.home_team_id)
                      // console.log('oia os matches ai', findLastMatches(match.home_team_id));
                      navigation.push("Match", {
                        match: {
                          ...match,
                          home_team_last_matches: findLastMatches(match.home_team_id),
                          away_team_last_matches: findLastMatches(match.away_team_id)
                        },
                        matchday: selectedMatchday,
                        tournament
                      })
                    }
                  }
                >
                  <SingleMatchLeft>
                    <SingleMatchTeam>
                      <SingleMatchTeamStat>
                        <TeamImage
                          source={{ uri: match.home_team_uri }}
                          width={30}
                          height={30}
                          ml={2}
                          mr={8}
                        />
                        <SingleMatchTeamName>
                          {match.home_team_name}
                        </SingleMatchTeamName>
                      </SingleMatchTeamStat>
                      <SingleMatchGoals>
                        {match.home_team_goals}
                      </SingleMatchGoals>
                    </SingleMatchTeam>
                    <SingleMatchTeam>
                      <SingleMatchTeamStat>
                        <TeamImage
                          source={{ uri: match.away_team_uri }}
                          width={30}
                          height={30}
                          ml={2}
                          mr={8}
                        />
                        <SingleMatchTeamName>
                          {match.away_team_name}
                        </SingleMatchTeamName>
                      </SingleMatchTeamStat>
                      <SingleMatchGoals>
                        {match.away_team_goals}
                      </SingleMatchGoals>
                    </SingleMatchTeam>
                  </SingleMatchLeft>
                  <SingleMatchRight>
                    {match.status === "start" ? (
                      <SingleMatchRightLabel>Start</SingleMatchRightLabel>
                    ) : (
                      <SingleMatchRightLabel>Full-Time</SingleMatchRightLabel>
                    )}
                  </SingleMatchRight>
                </SingleMatch>
              );
            })}
      </MatchdayContainer>
    </MainScrollView>
  );
}