import styled from "styled-components/native";
import MultiSelect from "react-native-multiple-select";
import { RadioButton, Button } from "react-native-paper";
import { ColorPicker as Picker } from "react-native-color-picker";
import {IStyledProps} from "../../../interfaces/styled-props.interface";

export const Select = styled(MultiSelect).attrs({
  itemTextColor: "#FFF",
  submitButtonColor: "#1B1B1B",
  submitButtonText: "Ready",
  searchInputStyle: {
    color: "#CCC",
  },
  styleInputGroup: {
    backgroundColor: "#e9e9e9",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  styleItemsContainer: {
    backgroundColor: "#1B1B1B",
  },
  styleDropdownMenuSubsection: {
    backgroundColor: "transparent",
  },
  styleDropdownMenu: {
    backgroundColor: "#1B1B1B",
    paddingLeft: 6,
  },
})``;

export const SelectContainer = styled.View`
  margin-bottom: 16px;
`;
export const ColorPicker = styled(Picker)`
  height: 200px;
  width: 100%;
  margin-bottom: 24px;
`;
export const SettingsContainer = styled.View`
  margin-bottom: 16px;
`;
export const SettingsTitle = styled.Text`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  padding: 0 0 4px 6px;
`;
export const SettingsRow = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const SettingsBox = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: ${({ justifyContent }: any) =>
    justifyContent ? justifyContent : "center"};
  align-items: center;
  padding: 8px 0;
  background: ${({ theme }: IStyledProps) =>
    theme.colors.secondary_background}; ;
`;
export const SettingsBoxButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: ${({ justifyContent }: any) =>
    justifyContent ? justifyContent : "center"};
  align-items: center;
  padding: 8px 0;
  background: #1b1b1b;
`;
export const SettingsLabel = styled.Text`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-size: 15px;
`;
export const SettingsValue = styled.TextInput`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  padding: 2px;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
  font-size: 15px;
`;
export const SettingsRadio = styled(RadioButton)``;
export const SettingsButton = styled(Button)`
  background-color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background};
  margin-top: ${({ marginTop }: any) => (marginTop ? `${marginTop}px` : 0)};
`;
