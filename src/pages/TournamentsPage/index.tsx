import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  Container,
  Header,
  PageTitle,
  SearchBoxContainer,
  SearchBoxInput,
  SearchBoxButton,
  SearchIcon,
  MainFlatList,
  DataListContainer,
  DataListImage,
  DataListTitle,
  FloatButton,
} from "../../styles/global";
import {} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import TournamentService from "../../services/tournament-service";
import TournamentTeamService from "../../services/tournament-team-service";
import GlobalContext from "../../context";
import {RouteStackParamList} from "../../interfaces/route-stack-param-list.type";
import {ITournament} from "../../interfaces/tournament.interface";
import PermissionsButton from "../../components/PermissionsButton";
import axios from "axios";

export default function TournamentsPage({
  navigation,
}: RouteStackParamList<"Tournaments">) {
  const { theme } = useContext(GlobalContext);
  const [tournaments, setTournaments] = useState<ITournament[]>([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://192.168.0.121:8080/league-stage");

      setTournaments(response.data);
      console.log('response', response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      // TournamentService.findAll()
      //   .then((response: any) => {
      //     setTournaments(response._array);
      //   })
      //   .catch((err) => console.error(err));

      fetchApi().then(r => {
        console.log('r', r)
      }).catch(err => console.error(err));
    });
  }, []);

  const actions = [
    {
      text: "New Tournament",
      icon: <Icon name="plus" size={16} color="#FFF" />,
      name: "new_tournament",
      position: 1,
      color: "orange",
    },
  ];

  // @ts-ignore
    return (
    <Container>
      <StatusBar
        barStyle={theme.title === "light" ? "dark-content" : "light-content"}
        backgroundColor={theme.colors.secondary_background}
      />

      <Header>
        <PageTitle>Tournaments</PageTitle>
        <SearchBoxContainer>
          <SearchBoxInput
            placeholder="Search Here..."
            placeholderTextColor={theme.colors.secondary_text_color}
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

      <MainFlatList
        keyboardShouldPersistTaps="handled"
        numColumns={3}
        data={tournaments}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: { item: any }) => {
          return (
            <DataListContainer
              onPress={() =>
                navigation.navigate("Tournament")
              }
            >
              <DataListImage source={{ uri: item.uri }} />
              <DataListTitle>{item.name}</DataListTitle>
            </DataListContainer>
          );
        }}
      />

      <FloatButton
        actions={actions}
        onPressItem={(name: String) => {
          // alert(`selected button: ${name}`);
          navigation.navigate("NewTournament");
        }}
      />
    </Container>
  );
}
