import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";

import {
  Container,
  InputName,
  Header,
  MainScrollView,
  PageTitle,
  FormContainer,
  ChooseImage,
  ChooseImageIcon,
  TeamImage,
  MainFlatList,
  DataListContainer,
  DataListImage,
  DataListTitle,
  Icon1,
} from "../../../styles/global";
import {} from "../styles";

import TeamService from "../../../services/team-service";
import TournamentService from "../../../services/tournament-service";
import {
  getImage,
  saveImage,
  selectImage,
} from "../../../services/file-system-management";
import TournamentTeamService from "../../../services/tournament-team-service";
import { Rating } from 'react-native-ratings';
import GlobalContext from "../../../context";
import {RouteStackParamList} from "../../../interfaces/route-stack-param-list.type";
import {ITeam} from "../../../interfaces/team.interface";
import {ITournament} from "../../../interfaces/tournament.interface";
import {ITournamentTeam} from "../../../interfaces/tournament-team.interface";

export default function EditTeamPage({
  navigation,
  route,
}: RouteStackParamList<"EditTeam">) {
  const [editTeam, setEditTeam] = useState<ITeam>({
    id: route.params.team.id,
    name: route.params.team.name,
    color: route.params.team.color,
    uri: route.params.team.uri,
    rating: route.params.team.rating
  });
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
  const [isPreviewAvailable, setIsPreviewAvailable] = useState<boolean>(true);
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    setEditTeam(route.params.team);
    console.log(route.params.team);

    TournamentTeamService.findTournamentsByTeamId(route.params.team.id)
      .then((response: any) => {
        if (response._array.length > 0) {
          let ids: number[] = [];

          response._array.forEach((standing: ITournamentTeam) => {
            ids.push(standing.tournament_id);
          });

          TournamentService.findTournamentsByIds(ids)
            .then((response: any) => {
              setTournaments(response._array);
            })
            .catch((err) =>
              console.error("Error trying find tounaments by ids", err)
            );
        }
      })
      .catch((err) =>
        console.error("Error trying to find tournaments by team id", err)
      );
  }, []);

  function handleSelectImage() {
    selectImage().then(async (response: any) => {
      if (response.status) {
        let { uri } = response;

        await saveImage(uri, editTeam.id);
        getImage(uri)
          .then((newUri: string) => {
            setEditTeam({ ...editTeam, uri: newUri });
            setIsPreviewAvailable(true);
          })
          .catch((err) => console.error(err));
      } else setIsPreviewAvailable(false);
    });
  }

  function handleEditTeam() {
    TeamService.updateById(editTeam)
      .then((response) => {
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => console.error("error", error));
  }

  function ratingCompleted(rating) {
    setEditTeam({...editTeam, rating});
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PageTitle textAlign="center">Edit Team</PageTitle>
        <TouchableOpacity onPress={handleEditTeam}>
          <Icon1 name="save" size={24} />
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
              <TeamImage
                source={{ uri: editTeam.uri }}
                width={150}
                height={150}
              />
            )}
          </ChooseImage>

          <InputName
            placeholder="Team Name"
            placeholderTextColor={theme.colors.secondary_text_color}
            value={editTeam?.name}
            onChangeText={(name: string) => setEditTeam({ ...editTeam, name })}
            mt={8}
          />

          <Rating
            type='custom'
            showRating
            startingValue={editTeam?.rating}
            ratingColor='#ffa500'
            tintColor='#202020'
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />

        </FormContainer>

        {tournaments.length === 0 ? (
          <PageTitle textAlign="center" mt={16}>
            No Tournaments Participated
          </PageTitle>
        ) : (
          <>
            <PageTitle textAlign="center" mt={16}>
              Participated Tournaments
            </PageTitle>
            <MainFlatList
              keyboardShouldPersistTaps="handled"
              numColumns={3}
              data={tournaments}
              keyExtractor={(item: ITournament) => String(item.id)}
              renderItem={({ item }: { item: ITournament }) => {
                return (
                  <DataListContainer
                    onPress={() =>
                      navigation.navigate("Tournament", { tournament: item })
                    }
                  >
                    <DataListImage source={{ uri: item.uri }} />
                    <DataListTitle>{item.name}</DataListTitle>
                  </DataListContainer>
                );
              }}
            />
          </>
        )}
      </MainScrollView>
    </Container>
  );
}
