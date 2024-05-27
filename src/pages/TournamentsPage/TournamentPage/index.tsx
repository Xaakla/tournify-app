import React, {useContext, useEffect, useState} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {
    Container,
    PageTitle,
    Header,
    Icon1,
} from "../../../styles/global";
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
    SingleMatchTeamColor,
    PickerMatchday,
    ResultsModal,
    ResultsModalStatsBox,
    ResultsModalStatsTitle,
    ResultsModalStatsRow,
    ResultsModalStatsButton,
    ResultsModalStatsLabel,
} from "./styles";
import TournamentTeamService from "../../../services/tournament-team-service";
import TournamentService from "../../../services/tournament-service";
import verifyMatchResults from "../../../services/verify-match-results";
import restartMatch from "../../../services/restart-match";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Table from "./TablePage";
import Matchday from "./MatchdayPage";
import GlobalContext from "../../../context";
import {RouteStackParamList} from "../../../interfaces/route-stack-param-list.type";
import {ITournament} from "../../../interfaces/tournament.interface";
import {ITournamentTeam} from "../../../interfaces/tournament-team.interface";
import {IRound} from "../../../interfaces/round.interface";
import {IMatch} from "../../../interfaces/match-interface";
import axios from "axios";

export default function TournamentPage({
                                           navigation,
                                           route,
                                       }: RouteStackParamList<"Tournament">) {
    const [tournament, setTournament] = useState<any>();
    // const [subpages, setSubpages] = useState<string[]>(["matchday", "table"]);
    // const [selectedSubpage, setSelectedSubpage] = useState<string>("table");
    // const [selectedMatchday, setSeletedMatchday] = useState<any>();
    // const [modalResults, setModalResults] = useState<boolean>(false);
    // const [teams, setTeams] = useState<ITournamentTeam[]>([]);
    // const [rounds, setRounds] = useState<IRound[]>([]);
    // const [matches, setMatches] = useState<IMatch[]>([]);
    // const emptyMatch: IMatch = {
    //   home_team_id: "",
    //   home_team_goals: 0,
    //   away_team_id: "",
    //   away_team_goals: 0,
    //   home_ultilization_rate: 0,
    //   away_ultilization_rate: 0,
    // };
    // const [matchToResult, setMatchToResult] = useState<IMatch>(
    //   emptyMatch
    // );
    // const [modalSettings, setModalSettings] = useState<boolean>(false);
    // const [isSaveMatchAvailable, setIsSaveMatchAvailable] = useState<boolean>(
    //   false
    // );
    // const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
    // const [labelDelTournament, setLabelDelTournament] = useState<string>(
    //   "Delete Tournament"
    // );
    // const [delAuthorization, setDelAuthorization] = useState<boolean>(false);

    const {theme} = useContext(GlobalContext);

    useEffect(() => {
        fetchApi().then(() => {

        })
        // setTournament({
        //   id: route.params.tournament.id,
        //   name: route.params.tournament.name,
        //   teamsQuantity: route.params.tournament.teamsQuantity,
        //   roundsQuantity: route.params.tournament.roundsQuantity,
        //   trip: route.params.tournament.trip,
        //   mode: route.params.tournament.mode,
        //   victory_points: route.params.tournament.victory_points,
        //   draw_points: route.params.tournament.draw_points,
        //   lose_points: route.params.tournament.lose_points,
        //   standings_zone: JSON.parse(
        //     route.params.tournament.standings_zone.toString()
        //   ),
        //   uri: route.params.tournament.uri,
        // });

        // TournamentTeamService.findTeamsByTournament(route.params.tournament.id)
        //   .then((response: any) => {
        //     setTeams(response._array);
        //   })
        //   .catch((err) => console.error("Error trying list teams", err));

        // TournamentService.findAllRounds(route.params.tournament.id)
        //   .then((response: any) => {
        //     setRounds(response._array);
        //
        //     let ids: any[] = [];
        //     response._array.forEach((round, index) => {
        //       ids.push(round.id);
        //     });
        //
        //     TournamentService.findAllMatches(ids)
        //       .then((response: any) => {
        //         setMatches(response._array);
        //       })
        //       .catch((err) =>
        //         console.error("Error trying search for matches", err)
        //       );
        //   })
        //   .catch((err) => console.error("Error trying find all rounds", err));
    }, []);

    // const handleSelectSubpage = (name: string) => setSelectedSubpage(name);
    //
    // function handleResults(match: IMatch) {
    //   teams.forEach((team, indexHome) => {
    //     if (team.team_id === match.home_team_id) {
    //       teams.forEach((team, indexAway) => {
    //         if (team.team_id === match.away_team_id) {
    //           console.log("matchtoresult", match);
    //           setMatchToResult({
    //             ...match,
    //             home_position: indexHome + 1,
    //             away_position: indexAway + 1,
    //           });
    //           setModalResults(true);
    //         }
    //       });
    //     }
    //   });
    // }
    //
    // function handleSaveMatch() {
    //   if (isSaveMatchAvailable) {
    //     if (matchToResult === undefined) return;
    //     console.log("matchtoresult", matchToResult);
    //
    //     TournamentService.updateMatch({ ...matchToResult, status: "fulltime" })
    //       .then(() => {
    //         let homeTeam: ITournamentTeam = teams.filter(
    //           (team) => team.team_id === matchToResult.home_team_id
    //         )[0];
    //         let awayTeam: ITournamentTeam = teams.filter(
    //           (team) => team.team_id === matchToResult.away_team_id
    //         )[0];
    //         let { home_team, away_team } = verifyMatchResults(
    //           matchToResult,
    //           homeTeam,
    //           awayTeam,
    //           tournament.victory_points,
    //           tournament.draw_points,
    //           tournament.lose_points
    //         );
    //
    //         TournamentTeamService.saveStandings(home_team)
    //           .then(() => {
    //             TournamentTeamService.saveStandings(away_team)
    //               .then(() => {
    //                 TournamentTeamService.findTeamsByTournament(tournament.id)
    //                   .then((response: any) => {
    //                     setTeams(response._array);
    //
    //                     let ids: any[] = [];
    //                     rounds.forEach((round, index) => {
    //                       ids.push(round.id);
    //                     });
    //
    //                     TournamentService.findAllMatches(ids)
    //                       .then((response: any) => {
    //                         setMatches(response._array);
    //                         setMatchToResult(emptyMatch);
    //                         setModalResults(false);
    //                         setIsSaveMatchAvailable(false);
    //                       })
    //                       .catch((err) =>
    //                         console.error("error trying find all matches", err)
    //                       );
    //                   })
    //                   .catch((err) =>
    //                     console.error("Error trying restadings teams", err)
    //                   );
    //               })
    //               .catch((err) =>
    //                 console.error("Error trying save home team's standings", err)
    //               );
    //           })
    //           .catch((err) =>
    //             console.error("Error trying save home team's standings", err)
    //           );
    //       })
    //       .catch((err) => console.error("Error trying save match", err));
    //   } else setModalResults(false);
    // }
    //
    // function handleRestartMatch() {
    //   TournamentService.updateMatch({
    //     ...matchToResult,
    //     status: "start",
    //     home_team_goals: 0,
    //     away_team_goals: 0,
    //   })
    //     .then(() => {
    //       let homeTeam: ITournamentTeam = teams.filter(
    //         (team) => team.team_id === matchToResult.home_team_id
    //       )[0];
    //       let awayTeam: ITournamentTeam = teams.filter(
    //         (team) => team.team_id === matchToResult.away_team_id
    //       )[0];
    //       let { home_team, away_team } = restartMatch(
    //         matchToResult,
    //         homeTeam,
    //         awayTeam,
    //         tournament.victory_points,
    //         tournament.draw_points,
    //         tournament.lose_points
    //       );
    //
    //       setMatchToResult({
    //         ...matchToResult,
    //         home_team_goals: 0,
    //         away_team_goals: 0,
    //         status: "start",
    //       });
    //
    //       TournamentTeamService.saveStandings(home_team)
    //         .then(() => {
    //           TournamentTeamService.saveStandings(away_team)
    //             .then(() => {
    //               TournamentTeamService.findTeamsByTournament(tournament.id)
    //                 .then((response: any) => {
    //                   setTeams(response._array);
    //
    //                   let ids: any[] = [];
    //                   rounds.forEach((round) => {
    //                     ids.push(round.id);
    //                   });
    //
    //                   TournamentService.findAllMatches(ids)
    //                     .then((response: any) => {
    //                       setMatches(response._array);
    //                     })
    //                     .catch((err) =>
    //                       console.error("error trying find all matches", err)
    //                     );
    //                 })
    //                 .catch((err) =>
    //                   console.error("Error trying restadings teams", err)
    //                 );
    //             })
    //             .catch((err) =>
    //               console.error("Error trying save home team's standings", err)
    //             );
    //         })
    //         .catch((err) =>
    //           console.error("Error trying save home team's standings", err)
    //         );
    //     })
    //     .catch((err) => console.error(err));
    // }
    //
    // function handleConfirmingDeletion() {
    //   let i = 5;
    //   const interval = setInterval(() => {
    //     if (i === 1)
    //       setLabelDelTournament("Click To Confirm Deletion In " + i + " Second");
    //     else
    //       setLabelDelTournament("Click To Confirm Deletion In " + i + " Seconds");
    //     i--;
    //     if (i === -1) {
    //       setLabelDelTournament("Delete Tournament");
    //       setDelAuthorization(false);
    //       return clearInterval(interval);
    //     }
    //   }, 1000);
    // }
    //
    // function handleDeleteTournament(tournamentId: number) {
    //   TournamentService.deleteTournament(tournamentId)
    //     .then((response) => {
    //       console.log(response);
    //       setDelAuthorization(false);
    //       navigation.goBack();
    //     })
    //     .catch((err) => console.error(err));
    // }

    const TopTab = createMaterialTopTabNavigator();

    const fetchApi = async () => {
        try {
            const response = await axios.get("http://192.168.0.121:8080/league-stage/1");

            setTournament(response.data);
            console.log('response', response.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            {/* <HeaderStack
        onLeftBtnPress={() => navigation.goBack()}
        leftBtnIcon="chevron-left"
        pageTitle=
        onRightBtnPress={() => setModalSettings(true)}
        rightBtnIcon="config"
      /> */}

            <Header>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon1 name="chevron-left" size={24}/>
                </TouchableOpacity>
                <PageTitle>{tournament?.name || 'fdsfsdfsd'}</PageTitle>
                <TouchableOpacity>
                    <Icon1 name="cog" size={24}/>
                </TouchableOpacity>
            </Header>

            <TopTab.Navigator
                // tabBarOptions={{
                //   activeTintColor: theme.colors.primary_color,
                //   inactiveTintColor: theme.colors.primary_text_color,
                //   style: {
                //     backgroundColor: theme.colors.secondary_background,
                //   },
                //   indicatorStyle: {
                //     backgroundColor: theme.colors.primary_color,
                //   },
                // }}
            >
                <TopTab.Screen
                    name="Matchday"
                    component={Matchday}
                    initialParams={{tournament}}
                />
                <TopTab.Screen
                    name="Table"
                    component={Table}
                    initialParams={{tournament: JSON.stringify(tournament)}}
                />
            </TopTab.Navigator>
        </Container>
    );

    //   if (tournament.name === '') return <></>;
    //   return (
    //       <Container>
    // <Header>
    //   <HeaderRow>
    //     <TouchableOpacity onPress={() => navigation.goBack()}>
    //       <HeaderIcon name="chevron-left" size={24} />
    //     </TouchableOpacity>
    //     <PageTitle>{tournament?.name}</PageTitle>
    //     <TouchableOpacity onPress={() => setModalSettings(true)}>
    //       <ConfigIcon name="cog" size={24} />
    //     </TouchableOpacity>
    //   </HeaderRow>
    //   <HeaderRow border>
    //     {subpages.map((subpage: string, index) => {
    //       return (
    //         <Subpage
    //           key={index + subpage}
    //           selected={selectedSubpage === subpage ? true : false}
    //           onPress={() => handleSelectSubpage(subpage)}
    //         >
    //           <SubpageLabel selected={selectedSubpage === subpage ? true : false}>
    //             {subpage}
    //           </SubpageLabel>
    //         </Subpage>
    //       );
    //     })}
    //   </HeaderRow>
    // </Header>;
    //           <Main>
    //             <SettingsModal
    //                 isVisible={modalSettings}
    //                 onBackButtonPress={() => setModalSettings(false)}
    //                 onBackdropPress={() => setModalSettings(false)}
    //             >
    //                 <SettingsModalContent>
    //                     <SettingsModalTitle>Settings</SettingsModalTitle>
    //                     <SettingsModalRow>
    //                         <SettingsModalRowLabel>Tournament Name</SettingsModalRowLabel>
    //                         <SettingsModalRowValue
    //                             value={tournament.name}
    //                             onChangeText={text => {
    //                                 setTournament({...tournament, name: text});
    //                             }}
    //                         />
    //                     </SettingsModalRow>
    //                     <SettingsModalRow>
    //                         <SettingsModalRowButton onPress={() => {
    //                             if (delAuthorization) return handleDeleteTournament(tournament.id);
    //                             else {
    //                                 setDelAuthorization(true);
    //                                 return handleConfirmingDeletion();
    //                             }
    //                         }}>
    //                             <SettingsModalRowLabel color="red">{labelDelTournament}</SettingsModalRowLabel>
    //                         </SettingsModalRowButton>
    //                     </SettingsModalRow>
    //                 </SettingsModalContent>
    //             </SettingsModal>
    // {
    //   selectedSubpage === "matchday" && (
    //     <>
    //       <PickerMatchday
    //         selectedValue={selectedMatchday}
    //         onValueChange={(itemValue, itemIndex) => {
    //           setSeletedMatchday(itemValue);
    //         }}
    //       >
    //         {rounds.map((round, index) => {
    //           return (
    //             <PickerMatchday.Item
    //               key={`matchday-${index + 1}`}
    //               label={`Matchday ${index + 1}`}
    //               value={index}
    //             />
    //           );
    //         })}
    //       </PickerMatchday>
    //
    //       <MatchdayContainer>
    //         {selectedMatchday >= 0 &&
    //           matches
    //             .filter(
    //               (singleMatch) =>
    //                 singleMatch.round_id === rounds[selectedMatchday].id
    //             )
    //             .map((match, index) => {
    //               // console.log('opa', tournament.matches[selectedMatchday])
    //               return (
    //                 <SingleMatch
    //                   key={`key-${match.id}`}
    //                   onPress={() => handleResults(match)}
    //                 >
    //                   <SingleMatchLeft>
    //                     <SingleMatchTeam>
    //                       <SingleMatchTeamStat>
    //                         <SingleMatchTeamColor color={match.home_team_color} />
    //                         <SingleMatchTeamName>
    //                           {match.home_team_name}
    //                         </SingleMatchTeamName>
    //                       </SingleMatchTeamStat>
    //                       <SingleMatchGoals>
    //                         {match.home_team_goals}
    //                       </SingleMatchGoals>
    //                     </SingleMatchTeam>
    //                     <SingleMatchTeam>
    //                       <SingleMatchTeamStat>
    //                         <SingleMatchTeamColor color={match.away_team_color} />
    //                         <SingleMatchTeamName>
    //                           {match.away_team_name}
    //                         </SingleMatchTeamName>
    //                       </SingleMatchTeamStat>
    //                       <SingleMatchGoals>
    //                         {match.away_team_goals}
    //                       </SingleMatchGoals>
    //                     </SingleMatchTeam>
    //                   </SingleMatchLeft>
    //                   <SingleMatchRight>
    //                     {match.status === "start" ? (
    //                       <SingleMatchRightLabel>Start</SingleMatchRightLabel>
    //                     ) : (
    //                       <SingleMatchRightLabel>Full-Time</SingleMatchRightLabel>
    //                     )}
    //                   </SingleMatchRight>
    //                 </SingleMatch>
    //               );
    //             })}
    //       </MatchdayContainer>
    //
    //       <ResultsModal
    //         isVisible={modalResults}
    //         onBackButtonPress={handleSaveMatch}
    //         onBackdropPress={handleSaveMatch}
    //       >
    //         <ResultsModalContent>
    //           <ResultsModalMatchday>
    //             Matchday {selectedMatchday + 1}
    //           </ResultsModalMatchday>
    //           <ResultsModalTeams>
    //             <ResultsModalTeam>
    //               <ResultsModalTeamShield
    //                 color={matchToResult?.home_team_color}
    //               />
    //               <ResultsModalTeamName
    //                 side="left"
    //                 color={matchToResult?.home_team_color}
    //               >
    //                 {matchToResult?.home_team_name}
    //               </ResultsModalTeamName>
    //             </ResultsModalTeam>
    //             {matchToResult?.status === "start" && (
    //               <StartMatchButton
    //                 onPress={() => {
    //                   setMatchToResult({ ...matchToResult, status: "playing" });
    //                   setIsSaveMatchAvailable(true);
    //                 }}
    //               >
    //                 <StartMatchButtonLabel>START</StartMatchButtonLabel>
    //               </StartMatchButton>
    //             )}
    //             {matchToResult?.status === "playing" && (
    //               <>
    //                 <ResultsModalTeamGoals
    //                   keyboardType="numeric"
    //                   maxLength={3}
    //                   value={String(matchToResult?.home_team_goals)}
    //                   onChangeText={(text) => {
    //                     if (text === "") text = 0;
    //                     setIsSaveMatchAvailable(true);
    //                     setMatchToResult({
    //                       ...matchToResult,
    //                       home_team_goals: parseInt(text),
    //                     });
    //                   }}
    //                 />
    //                 <ResultsModalTeamVS>:</ResultsModalTeamVS>
    //                 <ResultsModalTeamGoals
    //                   keyboardType="numeric"
    //                   value={String(matchToResult?.away_team_goals)}
    //                   onChangeText={(text) => {
    //                     if (text === "") text = 0;
    //                     setIsSaveMatchAvailable(true);
    //                     setMatchToResult({
    //                       ...matchToResult,
    //                       away_team_goals: parseInt(text),
    //                     });
    //                   }}
    //                 />
    //               </>
    //             )}
    //             {matchToResult?.status === "fulltime" && (
    //               <>
    //                 <ResultsModalTeamGoalsView>
    //                   {matchToResult?.home_team_goals}
    //                 </ResultsModalTeamGoalsView>
    //                 <ResultsModalTeamVS>:</ResultsModalTeamVS>
    //                 <ResultsModalTeamGoalsView>
    //                   {matchToResult?.away_team_goals}
    //                 </ResultsModalTeamGoalsView>
    //               </>
    //             )}
    //
    //             <ResultsModalTeam>
    //               <ResultsModalTeamShield
    //                 color={matchToResult?.away_team_color}
    //               />
    //               <ResultsModalTeamName
    //                 side="left"
    //                 color={matchToResult?.away_team_color}
    //               >
    //                 {matchToResult?.away_team_name}
    //               </ResultsModalTeamName>
    //             </ResultsModalTeam>
    //           </ResultsModalTeams>
    //
    //           <ResultsModalStatsRow>
    //             <ResultsModalStatsBox alignItems="flex-start" title>
    //               <ResultsModalStatsTitle>Match Stats</ResultsModalStatsTitle>
    //             </ResultsModalStatsBox>
    //             {matchToResult?.status === "fulltime" && (
    //               <ResultsModalStatsBox alignItems="flex-end">
    //                 <ResultsModalStatsButton
    //                   onPress={() => {
    //                     handleRestartMatch();
    //                   }}
    //                 >
    //                   <ResultsModalStatsLabel color="red">
    //                     Restart Match
    //                   </ResultsModalStatsLabel>
    //                 </ResultsModalStatsButton>
    //               </ResultsModalStatsBox>
    //             )}
    //           </ResultsModalStatsRow>
    //           <ResultsModalStatsRow marginBottom={24}>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel color="#FFF">
    //                 {matchToResult.home_position}°
    //               </ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel>POSITION</ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel color="#FFF">
    //                 {matchToResult.away_position}°
    //               </ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //           </ResultsModalStatsRow>
    //           <ResultsModalStatsRow>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel color="#FFF">
    //                 {matchToResult.home_ultilization_rate}%
    //               </ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel>
    //                 UTILIZATION RATE
    //               </ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //             <ResultsModalStatsBox>
    //               <ResultsModalStatsLabel color="#FFF">
    //                 {matchToResult.away_ultilization_rate}%
    //               </ResultsModalStatsLabel>
    //             </ResultsModalStatsBox>
    //           </ResultsModalStatsRow>
    //         </ResultsModalContent>
    //       </ResultsModal>
    //     </>
    //   );
    // }
    //             {selectedSubpage === 'table' && (

    //                 <>
    //                 <Table>
    //                     <Position border="#CCC" bgColor="#000">
    //                         <NPosition></NPosition>
    //                         <TeamName></TeamName>
    //                         <Matches>P</Matches>
    //                         <VDL>V</VDL>
    //                         <VDL>D</VDL>
    //                         <VDL>L</VDL>
    //                         <Goals>Goals</Goals>
    //                         <GoalsD>GD</GoalsD>
    //                         <Points>Pts</Points>
    //                     </Position>
    //                     {teams.map((team: TournamentTeamInterface, index) => {
    //                         let color: string = '#FFF';
    //                         if (tournament.standings_zone.length > 0) {
    //                             tournament.standings_zone.forEach((zone) => {
    //                                 if (index + 1 >= zone.from && index + 1 <= zone.to)
    //                                     color = zone.color;
    //                             });
    //                         }

    //                         return (
    //                             <Position key={team.team_id}>
    //                                 <NPosition color={color}>{index + 1}</NPosition>
    //                                 <TeamName>{team.name}</TeamName>
    //                                 <Matches>{team.matches_played}</Matches>
    //                                 <VDL>{team.victories}</VDL>
    //                                 <VDL>{team.draws}</VDL>
    //                                 <VDL>{team.losses}</VDL>
    //                                 <Goals>{team.goals_for}:{team.goals_against}</Goals>
    //                                 <GoalsD>{team.goals_difference}</GoalsD>
    //                                 <Points>{team.points}</Points>
    //                             </Position>
    //                         );
    //                     })}
    //                 </Table>
    //                 <ZoneContainer>
    //                     {tournament.standings_zone.map((zone, index) => (
    //                         <ZoneBox key={zone.label+index}>
    //                             <ZoneColor color={zone.color}></ZoneColor>
    //                             <ZoneLabel>{zone.label}</ZoneLabel>
    //                         </ZoneBox>
    //                     ))}
    //                 </ZoneContainer>
    //                 </>

    //             )}
    //           </Main>
    //       </Container>
    //   );
}
