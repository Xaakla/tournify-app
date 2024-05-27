import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import TeamService from "../../../services/team-service";
import {
  getImage,
  saveImage,
  selectImage,
} from "../../../services/file-system-management";
import { Rating } from 'react-native-ratings';

import {
  Container,
  Header,
  MainScrollView,
  PageTitle,
  FormContainer,
  ChooseImage,
  ChooseImageIcon,
  TeamImage,
  InputName,
  Icon1,
} from "../../../styles/global";
import GlobalContext from "../../../context";
import {RouteStackParamList} from "../../../interfaces/route-stack-param-list.type";
import {ITeam} from "../../../interfaces/team.interface";

function NewTeam({ navigation }: RouteStackParamList<"NewTeam">) {
  const [newTeam, setNewTeam] = useState<ITeam>({
    id: "",
    name: "",
    color: "#058000",
    uri: "",
    rating: 3
  });
  const [source, setSource] = useState<string>("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState<boolean>(false);
  const newId = "_" + Math.random().toString(36).substr(2, 9);

  const { theme } = useContext(GlobalContext);

  function handleSelectImage() {
    selectImage().then(async (response: any) => {
      if (response.status) {
        let { uri } = response;

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

  async function handleSaveTeam() {
    if (newTeam.name !== "" || newTeam.color !== "") {
      TeamService.addData({
        id: newId,
        name: newTeam.name,
        color: newTeam.color,
        uri: source,
        rating: newTeam.rating
      })
        .then((response) => {
          console.log("NEW TEAM CREATED SUCCESSFULLY WITH ID", response);
          setNewTeam({ id: "", name: "", color: "#058000", uri: source, rating: 3 });
          navigation.goBack();
        })
        .catch((err) => console.error(err));
    }
  }

  function ratingCompleted(rating) {
    setNewTeam({...newTeam, rating});
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon1 name="chevron-left" size={24} />
        </TouchableOpacity>
        <PageTitle textAlign="center">New Team</PageTitle>
        <TouchableOpacity onPress={handleSaveTeam}>
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
              <TeamImage source={{ uri: source }} width={150} height={150} />
            )}
          </ChooseImage>

          <InputName
            placeholder="Team Name"
            placeholderTextColor={theme.colors.secondary_text_color}
            value={newTeam?.name}
            onChangeText={(name: string) => setNewTeam({ ...newTeam, name })}
            mt={8}
          />

          <Rating
            type='custom'
            showRating
            ratingColor='#ffa500'
            tintColor='#202020'
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
            fractions={1}
          />

        </FormContainer>
      </MainScrollView>
    </Container>
  );
}

export default NewTeam;
