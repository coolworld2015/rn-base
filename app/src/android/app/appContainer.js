'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
    Dimensions,
    RefreshControl,
    DrawerLayoutAndroid
} from 'react-native';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    onBack() {
        appConfig.drawer.closeDrawer();
    }

    componentDidMount() {
        appConfig.drawer = this.refs['DRAWER_REF']
    }

    onLogOut() {
        appConfig.onLogOut();
    }

    render() {
        let navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 25, textAlign: 'center', color: 'black'}}>
                    Menu
                </Text>

                <TouchableHighlight
                    onPress={() => this.onLogOut()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Log out
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => this.onBack()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Back
                    </Text>
                </TouchableHighlight>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={200}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
            >
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar
                        activeTextColor='darkblue'
                        inactiveTextColor='darkblue'
                        underlineStyle={{backgroundColor: 'darkblue'}}
                        backgroundColor='white'/>}
                >
                    <PhonesTab tabLabel="Phones"/>
                    <UsersTab tabLabel="Users"/>
                    <AuditTab tabLabel="Audit"/>
                    <Logout tabLabel="Quit"/>

                </ScrollableTabView>
            </DrawerLayoutAndroid>
        );
    }
}

class PhonesTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Phones', index: 0},
            {title: 'Phones Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Phones routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <PhoneDetails data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
            case 2:
                return <Search data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
            case 3:
                return <SearchResults data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Users', index: 0},
            {title: 'Users Details', index: 1},
            {title: 'Add User', index: 2}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Users routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <UserDetails data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
            case 2:
                return <UserAdd data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class AuditTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Audit', index: 0},
            {title: 'Audit Details', index: 1},
            {title: 'Add Audit', index: 2}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Audit routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <AuditDetails data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class Logout extends Component {
    constructor(props) {
        super(props);

        appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    iconForm: {
        flexDirection: 'row',
        //borderColor: 'lightgray',
        borderColor: 'darkblue',
        borderWidth: 3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        paddingLeft: 20,
        marginLeft: -10,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default AppContainer;
