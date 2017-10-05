import Action from '../actions/action';
import * as firebase from 'firebase';
import axios from "axios";
import Polyline from '@mapbox/polyline';


var api = 'AIzaSyATlhy_STTTjK3i2VM4dvRAC4XG_mwMMMU'

export default class Middleware {

    static getPlaces() {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=500&key=${api}`)

                        .then((responce) => {
                            dispatch(Action.getPlaces(responce.data.results))
                        })
                },
                (err) => {
                    console.log(err.message)
                }
            ),
                () => {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                }

        }
    }

    static getParticularPlaces(data) {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=${data.radius}&type=${data.type}&key=${api}`)

                        .then((responce) => {
                            dispatch(Action.getParticularPlaces(responce.data.results))
                        })
                },
                (err) => {
                    console.log(err.message)
                }
            ),
                () => {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                }
        }
    }

    static getUserDirection(startLoc, destinationLoc) {
        coordsfound = {}
        console.log("middleware")
        return (dispatch) => {
            console.log(startLoc, destinationLoc, api)
             axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${api}`)
                .then((responce) => {
                    let points = Polyline.decode(responce.data.routes[0].overview_polyline.points);
                    let coords = points.map((point, index) => {
                        return {
                            latitude: point[0],
                            longitude: point[1]
                        }
                    })

                    dispatch(Action.userNavigation(coords))

                    coordsfound: coords

                })
        }
    }

}