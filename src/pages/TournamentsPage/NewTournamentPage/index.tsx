import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Select,
  SelectContainer,
  ColorPicker,
  SettingsContainer,
  SettingsTitle,
  SettingsRow,
  SettingsBox,
  SettingsBoxButton,
  SettingsLabel,
  SettingsValue,
  SettingsRadio,
  SettingsButton,
} from "./styles";
import TeamService from "../../../services/team-service";
import Toast from "react-native-toast-message";
import TournamentService from "../../../services/tournament-service";
import {
  Goals,
  GoalsD,
  Matches,
  NPosition,
  Points,
  Position,
  TeamName,
  Table,
} from "../TournamentPage/styles";
import {
  Container,
  InputName,
  Header,
  MainScrollView,
  PageTitle,
  Icon1,
  ChooseImage,
  ChooseImageIcon,
  TeamImage,
  FormContainer,
  Icon3,
} from "../../../styles/global";
import { fromHsv } from "react-native-color-picker";
import {
  getImage,
  saveImage,
  selectImage,
} from "../../../services/file-system-management";
import Popup from "../../../components/Popup";
import GlobalContext from "../../../context";
import {RouteStackParamList} from "../../../interfaces/route-stack-param-list.type";
import {ITeam} from "../../../interfaces/team.interface";
import {IStandingsZone} from "../../../interfaces/standings-zone.interface";
import {IHSV} from "../../../interfaces/hsv.interface";

export default function NewTournamentPage({
  navigation,
}: RouteStackParamList<"Tournaments">) {
  const [tournamentName, setTournamentName] = useState<string>();
  const [selectedTeamsId, setSelectedTeamsId] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<ITeam[]>();
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>();
  const [rounds, setRounds] = useState<number>();
  const [pointsSettings, setPointsSettings] = useState({
    victory: 3,
    draw: 1,
    lose: 0,
  });
  const [standingsZone, setStandingsZone] = useState<IStandingsZone[]>(
    []
  );
  const [source, setSource] = useState<string>("");
  const [
    newStandingsZone,
    setNewStandingsZone,
  ] = useState<IStandingsZone>({
    label: "",
    from: 0,
    to: 0,
    color: "#00ad26",
  });
  const [
    isStandingsZoneAvailable,
    setIsStandingsZoneAvailable,
  ] = useState<boolean>(false);
  const [trip, setTrip] = useState<string>("turn");
  const [modes, setModes] = useState([
    {
      id: "standings",
      name: "Standings",
    },
  ]);
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const [indexZoneToDelete, setIndexZoneToDelete] = useState<number>(-1);
  const [isPreviewAvailable, setIsPreviewAvailable] = useState<boolean>(false);

  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    TeamService.findAll()
      .then((response: any) => {
        setTeams(response._array);
        // console.log(response._array)
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedMode === "groups") {
      //
    }
  }, [selectedMode]);

  function handleCheckInputs() {
    if (selectedTeamsId.length === 0) {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Pick Teams",
        text2: "You need to pick teams to get going",
        visibilityTime: 5000,
      });
    }
    if (!selectedMode) {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Pick a Mode",
        text2: "You need to pick a mode to get going",
        visibilityTime: 5000,
      });
    }
    if (selectedTeamsId.length % 2 === 1) {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Pick a Even Number of Teams",
        text2: "You need to pick a even number of teams to get going",
        visibilityTime: 5000,
      });
    }
    if (!tournamentName || tournamentName === "") {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Pick a Tournament Name",
        text2: "You need to pick a tournament name to get going",
        visibilityTime: 5000,
      });
    }

    if (trip === "") {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Pick a Trip",
        text2: "You need to pick a trip to get going",
        visibilityTime: 5000,
      });
    }

    return handlePreparingTeams();
  }

  function handlePreparingTeams() {
    let teamsArray: ITeam[] = [];
    TeamService.findAllByIds(selectedTeamsId)
      .then((response: any) => {
        // response._array.forEach((team: TeamInterface) => {
        //   teamsArray.push({ ...team });
        // })

        setSelectedTeams([...response._array]);
      })
      .catch((err) => console.error(err));

    // promise.then(() => setSelectedTeams(teamsArray));

    if (trip === "turn") setRounds(selectedTeamsId.length - 1);
    if (trip === "return") setRounds(selectedTeamsId.length * 2 - 2);

    return handleSaveTournament();
  }

  function handleSaveTournament() {
    console.log("finally", {
      name: tournamentName,
      teamsId: selectedTeamsId,
      teams: selectedTeams,
      teamsQtd: selectedTeamsId.length,
      rounds: rounds,
      trip: trip,
      mode: selectedMode,
      victoryPoints: pointsSettings.victory,
      drawPoints: pointsSettings.draw,
      losePoints: pointsSettings.lose,
      standingsZone: standingsZone,
    });
    if (
      tournamentName !== undefined &&
      selectedTeamsId !== undefined &&
      selectedTeams !== undefined &&
      rounds !== undefined &&
      rounds > 0 &&
      trip !== undefined &&
      modes !== undefined &&
      selectedMode !== undefined &&
      pointsSettings.victory !== undefined &&
      pointsSettings.draw !== undefined &&
      pointsSettings.lose !== undefined &&
      standingsZone !== undefined
    ) {
      return TournamentService.create({
        name: tournamentName,
        teamsQuantity: selectedTeamsId.length,
        roundsQuantity: rounds,
        teams: selectedTeams,
        teamsIds: selectedTeamsId,
        trip: trip,
        mode: selectedMode,
        victoryPoints: pointsSettings.victory,
        drawPoints: pointsSettings.draw,
        losePoints: pointsSettings.lose,
        standingsZone: standingsZone,
        uri: source,
      })
        .then((response) => {
          console.log("create response", response);
          navigation.goBack();
        })
        .catch((err) =>
          console.error("error trying save a new tournament", err)
        );
    }
  }

  function checkStandingsZoneSettingsInput() {
    if (newStandingsZone.label === "")
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Empty Label",
        text2: "You need to fill out the label to get going",
        visibilityTime: 5000,
      });
    if (newStandingsZone.from === 0 || newStandingsZone.to === 0)
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Empty Start Or End Number",
        text2: "You need to fill out the start and end number to get going",
        visibilityTime: 5000,
      });
    if (newStandingsZone.color === "")
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "Empty",
        text2: "You need to choose a color to the standings zone to get going",
        visibilityTime: 5000,
      });

    handleCreateNewStandingsZone();
  }

  function handleCreateNewStandingsZone() {
    setStandingsZone([...standingsZone, newStandingsZone]);
    setNewStandingsZone({ label: "", from: 0, to: 0, color: "#00ad26" });
    return setIsStandingsZoneAvailable(false);
  }

  function handleDeleteStadingsZone() {
    let temp = standingsZone.filter(
      (zone) => zone !== standingsZone[indexZoneToDelete]
    );
    setStandingsZone(temp);
    setIndexZoneToDelete(-1);
  }

  function handleSelectImage() {
    selectImage().then(async (response: any) => {
      if (response.status) {
        let { uri } = response;
        const newId = "_" + Math.random().toString(36).substr(2, 9);

        await saveImage(uri, newId);
        getImage(uri)
          .then((newUri: string) => {
            setSource(newUri);
            setIsPreviewAvailable(true);
          })
          .catch((err) => console.error(err));
      } else setIsPreviewAvailable(false);
    });
  }

  return (
    <Container>
      <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 1000 }} />

      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PageTitle textAlign="center">New Tournament</PageTitle>
        <TouchableOpacity onPress={handleCheckInputs}>
          <Icon3 name="save" size={24} />
        </TouchableOpacity>
      </Header>
      <MainScrollView>
        <FormContainer>
          <ChooseImage
            width={150}
            height={150}
            onPress={() => handleSelectImage()}
          >
            {!isPreviewAvailable && (
              <ChooseImageIcon
                name="camera"
                size={24}
                color={theme.colors.primary_color}
              />
            )}
            {isPreviewAvailable && (
              <TeamImage source={{ uri: source }} width={150} height={150} />
            )}
          </ChooseImage>

          <InputName
            placeholder="Tournament Name"
            placeholderTextColor={theme.colors.secondary_text_color}
            value={tournamentName}
            onChangeText={setTournamentName}
            mt={8}
          />
        </FormContainer>

        <SelectContainer>
          <Select
            hideTags
            single
            items={modes}
            uniqueKey="id"
            displayKey="name"
            onSelectedItemsChange={(mode: string[]) => {
              setSelectedMode(mode[0]);
            }}
            selectedItems={selectedMode}
            selectText="Pick Mode"
            searchInputPlaceholderText="Search Modes..."
            selectedItemTextColor={theme.colors.primary_color}
            selectedItemIconColor={theme.colors.primary_color}
          />
        </SelectContainer>

        <SelectContainer>
          <Select
            hideTags
            items={teams}
            uniqueKey="id"
            displayKey="name"
            onSelectedItemsChange={(ids: string[]) => setSelectedTeamsId(ids)}
            onClearSelector={() => console.log("opa")}
            selectedItems={selectedTeamsId}
            selectText="Pick Teams"
            searchInputPlaceholderText="Search Teams..."
          />
        </SelectContainer>

        {selectedMode === "groups" && (
          <SettingsContainer>
            <SettingsTitle>Groups Settings:</SettingsTitle>
            <SettingsRow>
              <SettingsBox>
                <SettingsLabel>Number Of Groups:</SettingsLabel>
                <SettingsValue
                  placeholder="__"
                  placeholderTextColor={theme.colors.secondary_text_color}
                  keyboardType="numeric"
                />
              </SettingsBox>
              <SettingsBox>
                <SettingsLabel>Teams Per Group:</SettingsLabel>
                <SettingsValue
                  placeholder="__"
                  placeholderTextColor={theme.colors.secondary_text_color}
                  keyboardType="numeric"
                />
              </SettingsBox>
            </SettingsRow>
          </SettingsContainer>
        )}

        <SettingsContainer>
          <SettingsTitle>Pick Trip:</SettingsTitle>
          <SettingsRow>
            <SettingsBox>
              <SettingsRadio
                value="turn"
                status={trip === "turn" ? "checked" : "unchecked"}
                onPress={() => setTrip("turn")}
                color={theme.colors.primary_color}
                uncheckedColor={theme.colors.secondary_color}
              />
              <SettingsLabel onPress={() => setTrip("turn")}>
                Turn
              </SettingsLabel>
            </SettingsBox>
            <SettingsBox>
              <SettingsRadio
                value="return"
                status={trip === "return" ? "checked" : "unchecked"}
                onPress={() => setTrip("return")}
                color={theme.colors.primary_color}
                uncheckedColor={theme.colors.secondary_color}
              />
              <SettingsLabel onPress={() => setTrip("return")}>
                Return
              </SettingsLabel>
            </SettingsBox>
          </SettingsRow>
        </SettingsContainer>

        <SettingsContainer>
          <SettingsTitle>Points Settings:</SettingsTitle>
          <SettingsRow>
            <SettingsBox>
              <SettingsLabel>Victory:</SettingsLabel>
              <SettingsValue
                placeholder="__"
                placeholderTextColor={theme.colors.secondary_text_color}
                defaultValue="3"
                keyboardType="numeric"
                onChangeText={(text: string) =>
                  setPointsSettings({
                    ...pointsSettings,
                    victory: Number(text),
                  })
                }
              />
            </SettingsBox>
            <SettingsBox>
              <SettingsLabel>Draw:</SettingsLabel>
              <SettingsValue
                placeholder="__"
                placeholderTextColor={theme.colors.secondary_text_color}
                defaultValue="1"
                keyboardType="numeric"
                onChangeText={(text: string) =>
                  setPointsSettings({ ...pointsSettings, draw: Number(text) })
                }
              />
            </SettingsBox>
            <SettingsBox>
              <SettingsLabel>Lose:</SettingsLabel>
              <SettingsValue
                placeholder="__"
                placeholderTextColor={theme.colors.secondary_text_color}
                defaultValue="0"
                keyboardType="numeric"
                onChangeText={(text: string) =>
                  setPointsSettings({ ...pointsSettings, lose: Number(text) })
                }
              />
            </SettingsBox>
          </SettingsRow>
        </SettingsContainer>

        {selectedMode === "standings" && (
          <SettingsContainer>
            <SettingsTitle>Standings Zone Settings:</SettingsTitle>
            {!isStandingsZoneAvailable && (
              <>
                {standingsZone.length === 0 ? (
                  <SettingsBox>
                    <SettingsLabel color="red">
                      No Standings Zones Added
                    </SettingsLabel>
                  </SettingsBox>
                ) : (
                  <>
                    {standingsZone.map(
                      (item: IStandingsZone, index: number) => (
                        <SettingsRow>
                          <SettingsBoxButton
                            onPress={() => {
                              setPopupIsVisible(true);
                              setIndexZoneToDelete(index);
                            }}
                          >
                            <SettingsLabel>{item.label}: </SettingsLabel>
                            <SettingsLabel color={item.color}>
                              {item.from} - {item.to}
                            </SettingsLabel>
                          </SettingsBoxButton>
                        </SettingsRow>
                      )
                    )}
                  </>
                )}
              </>
            )}
            {isStandingsZoneAvailable && (
              <>
                <SettingsRow>
                  <SettingsBox>
                    <SettingsLabel>Standings Label: </SettingsLabel>
                    <SettingsValue
                      placeholder="Promotion"
                      placeholderTextColor={theme.colors.secondary_text_color}
                      textAlign="left"
                      onChangeText={(text: string) =>
                        setNewStandingsZone({
                          ...newStandingsZone,
                          label: text,
                        })
                      }
                    />
                  </SettingsBox>
                </SettingsRow>
                <SettingsRow>
                  <SettingsBox>
                    <SettingsLabel>From: </SettingsLabel>
                    <SettingsValue
                      placeholder="Start Number"
                      placeholderTextColor={theme.colors.secondary_text_color}
                      textAlign="left"
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        setNewStandingsZone({
                          ...newStandingsZone,
                          from: Number(text),
                        })
                      }
                    />
                  </SettingsBox>
                  <SettingsBox>
                    <SettingsLabel>To: </SettingsLabel>
                    <SettingsValue
                      placeholder="End Number"
                      placeholderTextColor={theme.colors.secondary_text_color}
                      textAlign="left"
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        setNewStandingsZone({
                          ...newStandingsZone,
                          to: Number(text),
                        })
                      }
                    />
                  </SettingsBox>
                </SettingsRow>
                <SettingsBox>
                  <SettingsLabel>Standings Color:</SettingsLabel>
                </SettingsBox>
                <SettingsRow>
                  <SettingsBox>
                    <ColorPicker
                      onColorChange={(color: IHSV) => {
                        setNewStandingsZone({
                          ...newStandingsZone,
                          color: fromHsv({
                            h: color.h,
                            s: color.s,
                            v: color.v,
                          }),
                        });
                      }}
                      defaultColor={newStandingsZone.color}
                    />
                  </SettingsBox>
                </SettingsRow>
                <SettingsBox>
                  <SettingsLabel>Standings Preview Example</SettingsLabel>
                </SettingsBox>
                <Table example>
                  <Position>
                    <NPosition></NPosition>
                    <TeamName></TeamName>
                    <Matches>P</Matches>
                    <Goals>Goals</Goals>
                    <GoalsD>GD</GoalsD>
                    <Points>Pts</Points>
                  </Position>
                  {[1, 2].map((position) => (
                    <Position>
                      <NPosition color={newStandingsZone.color}>
                        {position}
                      </NPosition>
                      <TeamName>Team Name</TeamName>
                      <Matches>0</Matches>
                      <Goals>0:0</Goals>
                      <GoalsD>0</GoalsD>
                      <Points>0</Points>
                    </Position>
                  ))}
                  <Position>
                    <NPosition>3</NPosition>
                    <TeamName>Team Name</TeamName>
                    <Matches>0</Matches>
                    <Goals>0:0</Goals>
                    <GoalsD>0</GoalsD>
                    <Points>0</Points>
                  </Position>
                  <Position>
                    <NPosition>4</NPosition>
                    <TeamName>Team Name</TeamName>
                    <Matches>0</Matches>
                    <Goals>0:0</Goals>
                    <GoalsD>0</GoalsD>
                    <Points>0</Points>
                  </Position>
                </Table>
              </>
            )}
            <SettingsRow>
              <SettingsBox>
                {!isStandingsZoneAvailable && (
                  <SettingsButton
                    mode="outline"
                    color={theme.colors.primary_text_color}
                    marginTop={16}
                    onPress={() => {
                      setIsStandingsZoneAvailable(true);
                    }}
                  >
                    Add Standings Zone
                  </SettingsButton>
                )}
                {isStandingsZoneAvailable && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <SettingsButton
                      mode="outline"
                      color={theme.colors.primary_text_color}
                      marginTop={16}
                      onPress={() => {
                        setNewStandingsZone({
                          label: "",
                          from: 0,
                          to: 0,
                          color: "#00ad26",
                        });
                        setIsStandingsZoneAvailable(false);
                      }}
                    >
                      Cancel
                    </SettingsButton>
                    <SettingsButton
                      mode="outline"
                      color={theme.colors.primary_text_color}
                      marginTop={16}
                      onPress={() => checkStandingsZoneSettingsInput()}
                    >
                      Confirm
                    </SettingsButton>
                  </View>
                )}
              </SettingsBox>
            </SettingsRow>
          </SettingsContainer>
        )}
      </MainScrollView>

      {/* Confirming deletion */}
      <Popup
        isVisible={popupIsVisible}
        contentLabel="Are you sure you want to delete this standings zone?"
        leftBtnLabel="Cancel"
        rightBtnLabel="Delete"
        onPressLeftBtn={() => {
          setPopupIsVisible(false);
          setIndexZoneToDelete(-1);
        }}
        onPressRightBtn={() => {
          handleDeleteStadingsZone();
          setPopupIsVisible(false);
        }}
        onTouchOutside={() => {
          setPopupIsVisible(false);
          setIndexZoneToDelete(-1);
        }}
      />
    </Container>
  );
}
