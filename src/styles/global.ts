import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon01 from "react-native-vector-icons/FontAwesome5";
import Icon02 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon03 from "react-native-vector-icons/Feather";
import { IStyledProps } from "../interfaces/styled-props.interface";
import { FloatingAction } from "react-native-floating-action";
import { ColorPicker as Picker } from "react-native-color-picker";

export const Container = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight(true)}px;
  background-color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background};
`;
export const Header = styled.View`
  background-color: ${({ theme }: IStyledProps) =>
    theme.colors.secondary_background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
`;
export const Icon1 = styled(Icon01)`
  color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
  padding: 8px 16px;
`;
export const Icon2 = styled(Icon02)`
  color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
  padding: 8px 16px;
`;
export const Icon3 = styled(Icon03)`
  color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
  padding: 8px 16px;
`;
export const PageTitle = styled.Text`
  flex: 1;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 700;
  color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
  text-align: ${({ textAlign }: any) => (textAlign ? textAlign : "left")};
  margin-top: ${({ mt }: any) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }: any) => (mb ? `${mb}px` : 0)};
  margin-left: ${({ ml }: any) => (ml ? `${ml}px` : 0)};
`;
export const SearchBoxContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
export const SearchBoxInput = styled.TextInput`
  width: 80%;
  background-color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background};
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-size: 14px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  padding: 4px 8px;
`;
export const SearchBoxButton = styled.TouchableOpacity`
  background: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background};
  justify-content: center;
  align-items: center;

  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 4px 8px;
`;
export const SearchIcon = styled(Icon01)``;
export const MainScrollView = styled.ScrollView`
  flex: 1;
  padding: 8px 12px;
  background-color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background}; ;
`;
export const MainFlatList = styled.FlatList`
  flex: 1;
  padding: 8px 12px;
`;
export const DataListContainer = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;
export const DataListImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 14px;
  margin-bottom: 10px;
`;
export const DataListTitle = styled.Text`
  font-size: 13px;
  margin-bottom: 16px;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  text-align: center;
`;
export const GroupListContainer = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }: IStyledProps) =>
      theme.colors.secondary_background};
  border-radius: 8px;
  margin-bottom: ${({ mb }: any) => (mb ? `${mb}px` : 0)};
`;
export const GroupListTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  text-align: center;
  margin-bottom: ${({ mb }: any) => (mb ? `${mb}px` : 0)};
`;
export const GroupListSubtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  text-align: center;
`;

export const BottomTabContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const BottomTabIcon = styled(Icon01)``;
export const BottomTabLabel = styled.Text`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-size: 12px;
`;

export const FormContainer = styled.View`
  background: ${({ theme }: IStyledProps) =>
    theme.colors.primary_background};
  align-items: center;
  padding: 8px 12px;
  border-radius: 14px;
`;
export const ChooseImage = styled.TouchableOpacity`
  width: ${({ width }: any) => (width ? `${width}px` : 0)};
  height: ${({ height }: any) => (height ? `${height}px` : 0)};
  justify-content: center;
  align-items: center;
`;
export const ChooseImageIcon = styled(Icon01).attrs({
  name: "camera",
  size: 24,
})``;
export const TeamImage = styled.Image`
  width: ${({ width }) => (width ? `${width}px` : 0)};
  height: ${({ height }) => (height ? `${height}px` : 0)};
  margin-left: ${({ ml }: any) => (ml ? `${ml}px` : 0)};
  margin-right: ${({ mr }: any) => (mr ? `${mr}px` : 0)};
  margin-top: ${({ mt }: any) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }: any) => (mb ? `${mb}px` : 0)};
`;

export const InputName = styled.TextInput`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-size: 16px;
  padding: 2px 8px;
  text-align: center;
  margin-top: ${({ mt }: any) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }: any) => (mb ? `${mb}px` : 0)};
  margin-left: ${({ ml }: any) => (ml ? `${ml}px` : 0)};
  margin-right: ${({ mr }: any) => (mr ? `${mr}px` : 0)};
`;

export const FloatButton = styled(FloatingAction).attrs({
  color: "orange",
  dismissKeyboardOnPress: true,
})``;

export const ColorPicker = styled(Picker)`
  height: ${({ height }: any) => (height ? height : 0)};
  margin-bottom: 24px;
`;
