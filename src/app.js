import React, { Component } from 'react'
import { View, Text } from "react-native"
import Nav from "./nav"
import { Container, Header } from 'native-base'
import * as firebase from 'firebase';
import store from "./store/index";
import { Provider } from "react-redux";

var config = {
    apiKey: "AIzaSyBWDavs4R5BWsvBDH1I_OHMH6WmXUAF7w4",
    authDomain: "patient-tracker-52438.firebaseapp.com",
    databaseURL: "https://patient-tracker-52438.firebaseio.com",
    projectId: "patient-tracker-52438",
    storageBucket: "patient-tracker-52438.appspot.com",
    messagingSenderId: "758085664154"
};
firebase.initializeApp(config);



class App extends Component {

    constructor() {
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    render() {
        return (
            <Provider store={store}>
                <Nav />
            </Provider>

        )
    }
}
export default App;

