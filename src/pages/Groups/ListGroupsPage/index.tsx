import {RouteStackParamList} from "../../../interfaces/route-stack-param-list.type";
import React, {useContext, useState} from "react";
import {IGroup} from "../../../interfaces/group.interface";
import GlobalContext from "../../../context";
import {
    Container,
    DataListContainer,
    DataListImage,
    DataListTitle,
    FloatButton,
    GroupListContainer, GroupListSubtitle,
    GroupListTitle,
    Header,
    MainFlatList,
    PageTitle,
    SearchBoxButton,
    SearchBoxContainer,
    SearchBoxInput,
    SearchIcon
} from "../../../styles/global";
import Icon from "react-native-vector-icons/FontAwesome5";
import {ITeam} from "../../../interfaces/team.interface";

const backupGroups = [
    {
        id: 1,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    },
    {
        id: 2,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    },
    {
        id: 3,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    },
    {
        id: 4,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    },
    {
        id: 5,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    },
    {
        id: 6,
        name: 'Times do Brasileirão',
        teamsQuantity: 20
    }
]

export default function ListGroupsPage({navigation}: RouteStackParamList<"ListGroups">) {
    const [groups, setGroups] = useState<IGroup[]>(backupGroups);
    const [searchText, setSearchText] = useState<string>("");

    const { theme } = useContext(GlobalContext);

    const actions = [
        {
            text: "New Group",
            icon: <Icon name="plus" size={16} color="#FFF" />,
            name: "new_group",
            position: 1,
            color: theme.colors.primary_color,
        },
    ];

    return (
        <Container>
            <Header>
                <PageTitle>Groups</PageTitle>
                <SearchBoxContainer>
                    <SearchBoxInput
                        placeholder="Search Here..."
                        value={searchText}
                        placeholderTextColor={theme.colors.secondary_text_color}
                        onChangeText={setSearchText}
                    />
                    <SearchBoxButton>
                        <SearchIcon
                            name="search"
                            size={20}
                            color={theme.colors.primary_color}
                        />
                    </SearchBoxButton>
                </SearchBoxContainer>
            </Header>

            <MainFlatList
                keyboardShouldPersistTaps="handled"
                data={groups}
                keyExtractor={(item: IGroup) => String(item.id)}
                renderItem={({ item }: { item: IGroup }) => {
                    return (
                        <GroupListContainer mb={18} onPress={() => navigation.navigate("Teams")}>
                            <GroupListTitle mb={12}>{item.name}</GroupListTitle>
                            <GroupListSubtitle>Times: {item.teamsQuantity}</GroupListSubtitle>
                        </GroupListContainer>
                    );
                }}
            />

            <FloatButton
                actions={actions}
                onPressItem={(name: string) => {navigation.navigate("NewTeam");}}
            />
        </Container>
    );
}