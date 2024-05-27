import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";

export const Header = styled.View`
  padding: 8px 12px;
  /* margin-bottom: 16px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderIcon = styled(Icon)`
  color: orange;
  padding: 8px 16px;
`;
