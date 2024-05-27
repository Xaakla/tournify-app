import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Header,
  PageTitle,
  SearchBoxContainer,
  SearchBoxInput,
  SearchBoxButton,
  SearchIcon,
  DataListContainer,
  DataListImage,
  DataListTitle,
  FloatButton,
  MainFlatList, Icon1,
} from "../../styles/global";
import Icon from "react-native-vector-icons/FontAwesome5";
import TeamService from "../../services/team-service";
import TournamentTeamInterface from "../../services/tournament-team-service";
import Popup from "../../components/Popup";
import GlobalContext from "../../context";
import {RouteStackParamList} from "../../interfaces/route-stack-param-list.type";
import {ITeam} from "../../interfaces/team.interface";
import {TouchableOpacity} from "react-native";

const backupTeams = [
  {
    id: '1',
    name: 'Santos',
    color: '#fafafa',
    uri: 'https://logodetimes.com/times/santos/logo-santos-2048.png',
    rating: 4.6
  },
  {
    id: '2',
    name: 'São Paulo',
    color: '#8b0000',
    uri: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png',
    rating: 4.4
  },
  {
    id: '3',
    name: 'Palmeiras',
    color: '#056002',
    uri: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-2048.png',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Corinthians',
    color: '#000000',
    uri: 'https://logodetimes.com/times/corinthians/logo-corinthians-2048.png',
    rating: 3.9
  },
  {
    id: '5',
    name: 'Flamengo',
    color: '#850000',
    uri: 'https://logodetimes.com/times/flamengo/logo-flamengo-2048.png',
    rating: 4.5
  },
  {
    id: '6',
    name: 'Fluminense',
    color: '#641818',
    uri: 'https://logodetimes.com/times/fluminense/logo-fluminense-2048.png',
    rating: 4.4
  },
  {
    id: '7',
    name: 'Vasco',
    color: '#000000',
    uri: 'https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-2048.png',
    rating: 3.8
  },
  {
    id: '8',
    name: 'Botafogo',
    color: '#000000',
    uri: 'https://logodetimes.com/times/botafogo/logo-botafogo-2048.png',
    rating: 4.2
  },
  {
    id: '9',
    name: 'Internacional',
    color: '#b20000',
    uri: 'https://logodetimes.com/times/internacional/logo-internacional-2048.png',
    rating: 4.1
  },
  {
    id: '10',
    name: 'Grêmio',
    color: '#003c6b',
    uri: 'https://logodetimes.com/times/gremio/logo-gremio-2048.png',
    rating: 4.6
  },
  {
    id: '11',
    name: 'Atlético Mineiro',
    color: '#000000',
    uri: 'https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png',
    rating: 4.4
  },
  {
    id: '12',
    name: 'Cruzeiro',
    color: '#02306c',
    uri: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-2048.png',
    rating: 3.9
  }
];

export default function TeamsPage({
  navigation,
}: RouteStackParamList<"Teams">) {
  const [teams, setTeams] = useState<ITeam[]>(backupTeams);
  const [searchText, setSearchText] = useState<string>("");
  const [idTeamToDelete, setIdTeamToDelete] = useState<string>("");
  const [
    isDeleteTeamPopupVisible,
    setIsDeleteTeamPopupIsVisible,
  ] = useState<boolean>(false);

  const { theme } = useContext(GlobalContext);

  const actions = [
    {
      text: "New Team",
      icon: <Icon name="plus" size={16} color="#FFF" />,
      name: "new_team",
      position: 1,
      color: theme.colors.primary_color,
    },
  ];

  useEffect(() => {
    navigation.addListener("focus", () => {
      // handleFindTeams();
    });
  }, []);

  function handleFindTeams() {
    TeamService.findAll().then((response: any) => {
      setTeams(response._array);
    }).catch((error: any) => console.error(error));
  }

  function handleLongPress(id: string) {
    setIdTeamToDelete(id);
    setIsDeleteTeamPopupIsVisible(true);
  }

  const handleDeleteTeam = (id: string) => {
    TournamentTeamInterface.findTournamentsByTeamId(id)
      .then(async (response: any) => {
        if (response._array.length > 0) {
          let curTeam = teams.filter((team) => team.id === idTeamToDelete)[0];
          alert(
            `${curTeam.name} can not be deleted because it is in ${response._array.length} tournaments`
          );
        } else {
          await TeamService.deleteById(id);
          // handleFindTeams();
        }
        setIdTeamToDelete("");
        setIsDeleteTeamPopupIsVisible(false);
      })
      .catch((err) =>
        console.error("Error trying to find tournaments by team id", err)
      );
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PageTitle>Teams</PageTitle>
        <SearchBoxContainer>
          <SearchBoxInput
            placeholder="Search Here..."
            value={searchText}
            placeholderTextColor={theme.colors.secondary_text_color}
            onChangeText={setSearchText}
          />
          <SearchBoxButton>
            <SearchIcon
              name="search"
              size={20}
              color={theme.colors.primary_color}
            />
          </SearchBoxButton>
        </SearchBoxContainer>
      </Header>

      {/* <Main> */}
      <MainFlatList
        keyboardShouldPersistTaps="handled"
        numColumns={3}
        data={teams}
        keyExtractor={(item: ITeam) => String(item.id)}
        renderItem={({ item }: { item: ITeam }) => {
          return (
            <DataListContainer
              onPress={() => navigation.navigate("EditTeam", { team: item })}
              onLongPress={() => handleLongPress(item.id)}
            >
              <DataListImage source={{ uri: item.uri }} />
              <DataListTitle>{item.name}</DataListTitle>
            </DataListContainer>
          );
        }}
      />

      <FloatButton
        actions={actions}
        onPressItem={(name: string) => {navigation.navigate("NewTeam");}}
      />

      {/* Confirming deletion */}
      <Popup
        isVisible={isDeleteTeamPopupVisible}
        contentLabel="Are you sure you want to delete this team?"
        leftBtnLabel="Cancel"
        rightBtnLabel="Delete"
        onPressLeftBtn={() => {
          setIsDeleteTeamPopupIsVisible(false);
          setIdTeamToDelete("");
        }}
        onPressRightBtn={() => handleDeleteTeam(idTeamToDelete)}
        onTouchOutside={() => setIsDeleteTeamPopupIsVisible(false)}
      />
    </Container>
  );
}
