import styled from "styled-components/native";
import { StyledPropsInterface } from "../../../../../interfaces";

export const MatchBoard = styled.View`
  flex-direction: row;
  border-color: ${({ theme }: StyledPropsInterface) =>
    theme.colors.secondary_color};
  padding: 16px;
  align-items: center;
  border-bottom-width: 1px;
`;
export const MatchBoardTeam = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MatchBoardTeamName = styled.Text`
  width: 100%;
  color: ${({ theme }: StyledPropsInterface) =>
    theme.colors.primary_text_color};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;
export const MatchBoardGoalsInput = styled.TextInput`
  color: ${({ theme }: StyledPropsInterface) =>
    theme.colors.primary_text_color};
  font-size: 32px;
  font-weight: 700;
  padding: 0 6px;
  text-align: center;
`;
export const MatchBoardGoalsView = styled.Text`
  color: ${({ theme }: StyledPropsInterface) =>
    theme.colors.primary_text_color};
  font-size: ${({ fontSize }: any) =>
    fontSize ? `${fontSize}px` : '32px'};
  font-weight: 700;
  padding: 0 6px;
  text-align: center;
`;
export const MatchBoardVS = styled.Text`
  color: orange;
  font-size: ${({ fontSize }: any) =>
    fontSize ? `${fontSize}px` : '30px'};
`;
export const StartMatchButton = styled.TouchableOpacity`
  padding: 6px 8px;
`;
export const StartMatchButtonLabel = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: orange;
`;

export const MatchFacts = styled.View`
  align-items: center;
  margin-left: ${({ ml }) => (ml ? `${ml}px` : 0)};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 0)};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 0)};
`;
export const MatchFactsRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
`;
export const MatchFactsLabel = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: StyledPropsInterface) => theme.colors.primary_color};
`;
export const MatchFactsValue = styled.Text`
  font-size: 16px;
  color: ${({ theme }: StyledPropsInterface) =>
    theme.colors.primary_text_color};
`;
export const MatchFactsL5MView = styled.View`
  flex-direction: column;
`;
export const MatchFactsL5M = styled.Text`
  color: green;
`;
