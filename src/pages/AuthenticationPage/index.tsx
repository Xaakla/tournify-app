import React, {useState} from "react";
import {RouteStackParamList} from "../../interfaces/route-stack-param-list.type";
import {Text, View} from "react-native";
import {
    AuthContainer, GoogleBtn, GoogleBtnIcon, GoogleBtnLabel,
    MainContent, MainSubtitle, MainTitle,
} from "./styles";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthenticationPage({navigation}: RouteStackParamList<"Authentication">) {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "675734001254-ufc8orf41ron4onaqm9anr41troa6s8g.apps.googleusercontent.com"
    });
    return (
        <AuthContainer>
           <MainContent>
                <View>
                    <MainTitle>Welcome to our app!</MainTitle>
                    <MainSubtitle>Please, sign in with your Google Account.</MainSubtitle>
                </View>

                <GoogleBtn onPress={() => promptAsync()}>
                    <GoogleBtnIcon name="google" size={24}/>

                    <GoogleBtnLabel>Sign in with Google</GoogleBtnLabel>
                </GoogleBtn>
            </MainContent>
        </AuthContainer>
    );
}