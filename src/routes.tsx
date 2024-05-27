import { createStackNavigator } from "@react-navigation/stack";
import {RouteParamList} from "./interfaces/route-param-list.type";
import {useContext} from "react";
import GlobalContext from "./context";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BottomTabContainer, BottomTabIcon, BottomTabLabel} from "./styles/global";
import TournamentsPage from "./pages/TournamentsPage";
import NewTournamentPage from "./pages/TournamentsPage/NewTournamentPage";
import TournamentPage from "./pages/TournamentsPage/TournamentPage";
import MatchPage from "./pages/TournamentsPage/TournamentPage/MatchdayPage/MatchPage";
import TeamsPage from "./pages/TeamsPage";
import NewTeamPage from "./pages/TeamsPage/NewTeamPage";
import EditTeamPage from "./pages/TeamsPage/EditTeamPage";
import SettingsPage from "./pages/SettingsPage";
import ListGroupsPage from "./pages/Groups/ListGroupsPage";
import AuthenticationPage from "./pages/AuthenticationPage";

const Stack = createStackNavigator<RouteParamList>();

function TournamentStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tournaments"
                component={TournamentsPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewTournament"
                component={NewTournamentPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tournament"
                component={TournamentPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Match"
                component={MatchPage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function GroupStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListGroups"
                component={ListGroupsPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewEditGroup"
                component={NewTeamPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Teams"
                component={TeamsPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewTeam"
                component={NewTeamPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditTeam"
                component={EditTeamPage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={SettingsPage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();

function AppBottomTabs() {
    const { theme } = useContext(GlobalContext);

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "TournamentsTab")
                        iconName = focused ? "trophy" : "trophy";
                    else if (route.name === "GroupsTab")
                        iconName = focused ? "list" : "list";
                    else iconName = focused ? "cogs" : "cogs";

                    // You can return any component that you like here!
                    return (
                        <BottomTabContainer>
                            <BottomTabIcon
                                name={iconName}
                                size={focused ? 20 : 18}
                                color={color}
                            />
                            {
                                (iconName = focused && (
                                    <BottomTabLabel>{route.name.split("Tab")}</BottomTabLabel>
                                ))
                            }
                        </BottomTabContainer>
                    );
                },
                tabBarActiveTintColor: theme.colors.primary_text_color,
                tabBarInactiveTintColor: theme.colors.secondary_color,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.secondary_background,
                },
            })}
        >
            <BottomTab.Screen name="TournamentsTab" component={TournamentStack} />
            <BottomTab.Screen name="GroupsTab" component={GroupStack} />
            <BottomTab.Screen name="SettingsTab" component={SettingsStack} />
        </BottomTab.Navigator>
    );
}

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen*/}
                {/*    name="Authentication"*/}
                {/*    component={AuthenticationPage}*/}
                {/*    options={{ headerShown: false }}*/}
                {/*/>*/}
                <Stack.Screen
                    name="App"
                    component={AppBottomTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;