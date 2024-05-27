import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PageTitle } from "../../styles/global";
import { Header, HeaderIcon } from "./styles";

interface HeaderStackPropsInterface {
  onLeftBtnPress: void;
  leftBtnIcon: string;
  pageTitle: string;
  onRightBtnPress: Function;
  rightBtnIcon: string;
}

function HeaderStack({
  onLeftBtnPress,
  leftBtnIcon,
  pageTitle,
  onRightBtnPress,
  rightBtnIcon,
}: HeaderStackPropsInterface) {
  return (
    <Header>
      <TouchableOpacity onPress={() => onLeftBtnPress}>
        <HeaderIcon name={leftBtnIcon} size={24} />
      </TouchableOpacity>
      <PageTitle textAlign="center">{pageTitle}</PageTitle>
      <TouchableOpacity onPress={() => onRightBtnPress}></TouchableOpacity>
    </Header>
  );
}

export default HeaderStack;
