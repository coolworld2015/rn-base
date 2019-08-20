'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    TextInput,
    BackHandler,
    Alert
} from 'react-native';

class UserDetails extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            serverError: false
        };

        if (props.data) {
            this.state = {
                id: props.data.id,
                name: props.data.name,
                pass: props.data.pass,
                description: props.data.description,
                showProgress: false
            };
        }
    }

    updateItem() {
        if (this.state.name === undefined || this.state.name === '' ||
            this.state.pass === undefined || this.state.pass === '' ||
            this.state.description === undefined || this.state.description === '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/users/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                pass: this.state.pass,
                description: this.state.description,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.pass) {
                    appConfig.users.refresh = true;
                    this.props.navigator.pop();
                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    deleteItemDialog() {
        Alert.alert(
            'Delete record',
            'Are you sure you want to delete ' + this.state.name + '?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {
                    text: 'OK', onPress: () => {
                    this.deleteItem();
                }
                },
            ]
        );
    }

    deleteItem() {
        this.setState({
            showProgress: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/users/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.text) {
                    appConfig.users.refresh = true;
                    this.props.navigator.pop();
                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });

    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        let errorCtrl, validCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }
		
        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
					color="darkblue"
                    animating={true}
                />
            </View>;
        }
		
        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='darkblue'
						>
                            <View>
                                <Text style={styles.textSmall}>
                                    Back
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback underlayColor='#ddd'>
                            <View>
                                <Text style={styles.textLarge}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
						<TouchableHighlight
							onPress={()=> this.deleteItemDialog()}
							underlayColor='darkblue'
						>
                            <View>
                                <Text style={styles.textSmall}>
                                    Delete
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.form}>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                name: text,
                                invalidValue: false
                            })}
                            style={styles.formInputBold}
                            value={this.state.name}
                            placeholder='Login'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                pass: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.pass}
                            placeholder='Password'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            multiline={true}
                            onChangeText={(text) => this.setState({
                                description: text,
                                invalidValue: false
                            })}
                            style={styles.formInputArea}
                            value={this.state.description}
                            placeholder='Description'>
                        </TextInput>

                        {validCtrl}

                        <TouchableHighlight
                            onPress={() => this.updateItem()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Submit
                            </Text>
                        </TouchableHighlight>

                        {errorCtrl}
						
						{loader}

                        <Text>{this.state.bugANDROID}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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
        margin: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    formInputBold: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    formInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    formInputArea: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
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
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default UserDetails;