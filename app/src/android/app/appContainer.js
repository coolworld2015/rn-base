import React, {Component} from 'react';

import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import {StackViewStyleInterpolator} from 'react-navigation-stack';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

const PhonesTab = createStackNavigator({
        Phones,
        PhoneDetails,
        Search,
        SearchResults
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const UsersTab = createStackNavigator({
        Users,
        UserDetails,
        UserAdd
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const AuditTab = createStackNavigator({
        Audit,
        AuditDetails
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.quitComponent();
            }
        );
    }

    quitComponent() {
        appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

const tabBarOptions = {
    style: {
        backgroundColor: 'white'
    },
    labelStyle: {
        color: 'darkblue',
        fontWeight: 'bold'
    },
    upperCaseLabel: false,
    indicatorStyle: {backgroundColor: 'darkblue'}
};

const TabNavigator = createMaterialTopTabNavigator({
        Phones: PhonesTab,
        Users: UsersTab,
        Audit: AuditTab,
        Quit: Logout
    },
    {
        tabBarPosition: 'top',
        tabBarOptions
    }
);

export default createAppContainer(TabNavigator);
