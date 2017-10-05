import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import MapView from "react-native-maps"
import { connect } from "react-redux"
import { Container, Text, Button } from "native-base"

function mapStateToProps(state) {
    console.log(state.MyReducer.user_navigate_coords)
    return {
        coord: state.MyReducer.user_navigate_coords,
    }
}

class Polyline extends Component {
    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            latitude: 24.8716,
            longitude: 67.0599,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021, 

        }
    }
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {

        return (
            <Container>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0021,
                    }}
                    provider="google"
                    mapType="standard"
                    followsUserLocation
                    showsUserLocation
                    showsCompass
                    showsMyLocationButton
                    toolbarEnabled
                >
                    <MapView.Polyline
                        coordinates={this.props.coord}
                        strokeWidth={4}
                        lineCap="round"
                        strokeColor="blue" />

                </MapView>
            </Container>
        )
    }
}

export default connect(mapStateToProps, null)(Polyline)


const styles = {

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
}