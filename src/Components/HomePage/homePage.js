import React, { Component } from 'react'
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Left,
    Body,
    Right,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Title,
    Spinner
} from 'native-base';
import { NavigationActions } from 'react-navigation'
import { View, Image } from "react-native";
import firebase from 'firebase';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware/middleware';
import MapView from 'react-native-maps';
import axios from 'axios';


function mapStateToProps(state) {
    console.log(state)
    return {
        gotted_places: state.MyReducer.get_places,
        gotted_particular_places: state.MyReducer.get_particular_places
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPlaces: () => dispatch(Middleware.getPlaces()),
        userNavigate: (start, destination) => {
            dispatch(Middleware.getUserDirection(start, destination))
        }
    }
};

class HomePage extends Component {

    constructor() {
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            latitude: 24.8716,
            longitude: 67.0599,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            places: []
        }

    }

    static navigationOptions = {
        header: null
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.gotted_particular_places)
        if (nextProps.gotted_particular_places.length > 0) {
            this.state.places = nextProps.gotted_places
            this.setState({
                places: nextProps.gotted_particular_places
            })
            console.log(this.state.places)
            console.log("particular places")
        } else {
            this.state.places = nextProps.gotted_places
            this.setState({
                places: nextProps.gotted_places
            })
            console.log(this.state.places)
            console.log("places")
        }
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                    })
            } else {
                this.props.navigation.navigate('AppRoute')
            }
        });

    }
    componentWillMount() {
        this.props.getPlaces()

    }

    _signOut() {
        firebase.auth().signOut().then(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'AppRoute' })
                ]
            })
            this.props.navigation.dispatch(resetAction)


        })

    }

    go(m) {
        const destinationLatitude = m.geometry.location.lat
        const destinationLongitude = m.geometry.location.lng
        const initialLatitude = this.state.latitude
        const initialLongitude = this.state.longitude
        const InitialPoints = `"${initialLatitude} , ${initialLongitude}"`

        const desLongAndLat = `"${destinationLatitude} , ${destinationLongitude}"`

        this.props.userNavigate(InitialPoints, desLongAndLat)

        this.props.navigation.navigate("PolyLineRoute")
    }

    renderList() {
        return (
            <List>
                {this.state.places.map((m, v) => {
                    return (
                        <ListItem
                            style={styles.listView}
                            key={v}
                        >
                            <Image
                                style={{ width: 30, height: 30, marginRight: 10 }}
                                source={{ uri: m.icon }}
                            />
                            <Body>
                                <Text>{m.name}</Text>
                                <Text
                                    style={styles.textNote}
                                    note
                                >{m.vicinity}</Text>
                            </Body>
                            <Right>
                                <Button transparent
                                    success
                                    onPress={() => { this.go(m) }}
                                >
                                    <Text style={styles.viewButton}>Go</Text>
                                </Button>
                            </Right>

                        </ListItem>

                    )
                })}
            </List>

        )
    }

    spinnerOrList() {
        if (this.props.gotted_places.length > 0) {
            return this.renderList()
        } else {
            return <Spinner />
        }
    }

    render() {
        return (

            <Container>
                <Content>
                    <Header>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                            >
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Tourist Application</Title>
                        </Body>
                        <Right>
                            <Button onPress={this._signOut.bind(this)}><Text>Sign Out</Text></Button>
                        </Right>
                    </Header>
                </Content>
                <Container style={styles.container}>

                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                        }}
                        provider="google"
                        mapType="standard"
                        followsUserLocation
                        showsUserLocation
                        showsCompass
                        showsMyLocationButton
                        toolbarEnabled
                    ></MapView>
                    <Container style={styles.customView}>
                        <Content>
                            {this.spinnerOrList()}
                        </Content>
                    </Container>
                </Container>
            </Container>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = {
    container: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 300,
        flex: 1,

    },
    customView: {
        marginTop: 200,
        backgroundColor: "#b0bec5"

    },
    listView: {
        marginTop: 0,
        top: 0,
        left: -10,
        right: 0,
        bottom: 0,
    },

    textNote: {
        color: "#0d47a1"
    },
    viewButton: {
        color: "#b71c1c",

    },
}
