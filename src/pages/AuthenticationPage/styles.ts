import styled from "styled-components/native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {IStyledProps} from "../../interfaces/styled-props.interface";
import Icon01 from "react-native-vector-icons/FontAwesome5";

export const AuthContainer = styled.View`
    flex: 1;
    padding-top: ${getStatusBarHeight(false)}px;
    align-items: center;
    justify-content: center;


`;
export const MainContent = styled.View`
    background: ${({ theme }: IStyledProps) => theme.colors.secondary_background};
    width: 90%;
    min-height: 30%;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 24px;
`;
export const MainTitle = styled.Text`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }: IStyledProps) => theme.colors.primary_text_color};
`;
export const MainSubtitle = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }: IStyledProps) => theme.colors.primary_text_color};
`;
export const GoogleBtn = styled.TouchableOpacity`
    border: ${({ theme }: IStyledProps) =>
            theme.colors.primary_color};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    margin-top: ${({ mt }: any) => (mt ? `${mt}px` : 0)};
`;
export const GoogleBtnLabel = styled.Text`
    padding: 8px 16px 8px 0;
    font-weight: 600;
    font-size: 15px;
    color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
`;
export const GoogleBtnIcon = styled(Icon01)`
  color: ${({ theme }: IStyledProps) => theme.colors.primary_color};
  padding: 8px 16px;
`;
