import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker as PickerToStyle } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { ProgressBar as Progress } from "react-native-paper";
import {IStyledProps} from "../../../interfaces/styled-props.interface";

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: ${({ border }: any) => (border ? "2px" : 0)};
  border-bottom-color: #1b1b1b;
`;

export const ConfigIcon = styled(Icon)`
  color: orange;
  padding: 8px 16px;
`;
export const Subpage = styled.TouchableOpacity`
  padding: 6px 8px;
  margin-right: 24px;
  margin-top: 12px;
  font-size: 12px;
  border-bottom-width: ${({ selected }: any) => (selected ? "1px" : 0)};
  border-bottom-color: orange;
`;
export const SubpageLabel = styled.Text`
  color: ${({ selected }: any) => (selected ? "orange" : "#B1B1B1")};
  text-align: center;
  text-transform: capitalize;
`;

export const Table = styled.View`
  border-bottom-width: 1px;
  border-color: ${(props: IStyledProps) =>
    props.example ? "transparent" : props.theme.colors.secondary_text_color};
  background-color: ${(props: IStyledProps) =>
    props.example
      ? props.theme.colors.secondary_background
      : props.theme.colors.primary_background};
`;
export const Position = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${({ border }: any) => (border ? "1px" : 0)};
  border-bottom-color: ${({ border }: any) => (border ? border : "#000")};
  background-color: ${({ bgColor }: any) => (bgColor ? bgColor : "transparent")};
  padding: 4px 0;
  margin-bottom: 8px;
`;
export const NPosition = styled.Text`
  width: 30px;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: ${(props: IStyledProps) =>
    props.color ? props.color : props.theme.colors.secondary_text_color};
`;
export const TeamName = styled.Text`
  flex: 1;
  padding: 4px;
  font-size: 15px;
  text-align: left;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const Matches = styled.Text`
  width: 30px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const VDL = styled.Text`
  width: 30px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const Goals = styled.Text`
  width: 50px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const GoalsD = styled.Text`
  width: 30px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const Points = styled.Text`
  width: 30px;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-weight: 700;
`;

export const MatchdayContainer = styled.ScrollView``;
export const SingleMatch = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 8px;
  padding-top: 8px;
  border-top-width: 1px;
  border-color: ${({ theme }: IStyledProps) =>
    theme.colors.secondary_color};
`;
export const SingleMatchLeft = styled.View`
  flex: 3;
`;
export const SingleMatchRight = styled.View`
  flex: 1;
  border-left-width: 1px;
  border-color: ${({ theme }: IStyledProps) =>
    theme.colors.secondary_color};
  justify-content: center;
  align-items: center;
`;
export const SingleMatchRightLabel = styled.Text`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.secondary_text_color};
  font-size: 12px;
  font-weight: 500;
`;
export const SingleMatchTeam = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 6px 8px;
`;
export const SingleMatchTeamName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const SingleMatchGoals = styled.Text`
  font-size: 18px;
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
`;
export const SingleMatchTeamStat = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const SingleMatchTeamColor = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ color }: any) => color};
  border-width: 1px;
  border-color: #fff;
  margin-right: 8px;
`;

export const PickerMatchdayContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
`;
export const PickerMatchday = styled(PickerToStyle)`
  height: 100%;
  flex: 1;
  color: #fff;
  opacity: 0;
`;
export const PickerMatchdayLabel = styled.Text`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* background: red; */
  color: orange;
  font-size: 22px;
  font-weight: 700;
  position: absolute;
  z-index: -1;
`;

export const ResultsModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

export const ResultsModalMatchday = styled.Text`
  color: orange;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const ResultsModalTeamShield = styled.View`
  background-color: ${({ color }: any) => (color ? color : "#000")};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: #fff;
`;

export const ResultsModalStatsBox = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: ${({ alignItems }: any) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }: any) =>
    justifyContent ? justifyContent : "center"};
  margin: ${({ title }: any) => (title ? "2px 14px 24px" : "2px 8px")};
`;
export const ResultsModalStatsTitle = styled.Text`
  color: orange;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
`;
export const ResultsModalStatsRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: ${({ justifyContent }: any) =>
    justifyContent ? justifyContent : "center"};
  align-items: ${({ alignItems }: any) => (alignItems ? alignItems : "center")};
  margin-bottom: ${({ marginBottom }: any) =>
    marginBottom ? `${marginBottom}px` : 0};
`;
export const ResultsModalStatsButton = styled.TouchableOpacity`
  /* border-width: */
`;
export const ResultsModalStatsLabel = styled.Text`
  color: ${({ color }: any) => (color ? color : "orange")};
  font-size: 16px;
  font-weight: 700;
  /* margin-bottom: 6px; */
`;
export const SettingsModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
export const SettingsModalContent = styled.View`
  background-color: #1b1b1b;
  padding: 16px 16px 64px 16px;
  align-items: center;
`;
export const SettingsModalTitle = styled.Text`
  color: orange;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;
export const SettingsModalRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 6px 8px;
  margin-top: 12px;
  /* margin-bottom: 12px; */
  /* background: yellow; */
`;
export const SettingsModalRowLabel = styled.Text`
  color: ${({ color }: any) => (color ? color : "orange")};
  font-size: 18px;
  font-weight: 700;
`;
export const SettingsModalRowValue = styled.TextInput`
  color: ${({ color }: any) => (color ? color : "#FFF")};
  font-size: 16px;
`;
export const SettingsModalRowButton = styled.TouchableOpacity``;
export const ZoneContainer = styled.View`
  margin: 16px 0;
`;
export const ZoneBox = styled.View`
  flex-direction: row;
  padding: 6px 8px;
`;
export const ZoneColor = styled.View`
  background-color: ${({ color }: any) => (color ? color : "#FFF")};
  width: 15px;
  height: 15px;
  margin-right: 6px;
`;
export const ZoneLabel = styled.Text`
  color: ${({ theme }: IStyledProps) =>
    theme.colors.primary_text_color};
  font-size: 12px;
`;

export const ProgressBar = styled(Progress)`
  color: ${({ color }) => color};
  width: 150px;
  /* padding: 5px; */
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
`;
