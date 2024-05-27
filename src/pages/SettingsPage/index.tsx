import React, { useContext } from "react";
import { Switch } from "react-native-gesture-handler";
import GlobalContext from "../../context/index";
import { RouteStackParamList } from "../../interfaces/route-stack-param-list.type";
import {
  Container,
  Header,
  MainScrollView,
  PageTitle,
} from "../../styles/global";
import { Block, BlockLabel } from "./styles";

export default function SettingsPage({
  navigation,
}: RouteStackParamList<"Settings">) {
  const { theme, toggleTheme } = useContext(GlobalContext);

  return (
    <Container>
      <Header>
        <PageTitle textAlign="center">Settings</PageTitle>
      </Header>
      <MainScrollView>
        <Block>
          <BlockLabel>Light Mode: </BlockLabel>
          <Switch
            trackColor={{
              true: theme.colors.secondary_color,
              false: theme.colors.secondary_color,
            }}
            thumbColor={theme.colors.primary_color}
            onValueChange={() => toggleTheme()}
            value={theme.title === "light"}
          />
        </Block>
      </MainScrollView>
    </Container>
  );
}
