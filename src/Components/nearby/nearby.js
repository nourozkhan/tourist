import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item, Label } from "native-base";

import Middleware from "../../store/middleware/middleware"
import { connect } from "react-redux"


function mapStateToProps(state) {
    return {
        componentState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getParticularPlaces: (data) =>dispatch(Middleware.getParticularPlaces(data))
    }
}


class Nearby extends Component {

    constructor() {
        super()
        this.state = {
            value: 'restaurant',
            radius: 500

        }
    }

    static navigationOptions = {
        header: false
    }

    selectedPlace(value) {
        this.setState({
            value: value
        })
    }


    selectedRadius(radius) {
        this.setState({
            radius: radius
        })
    }

    getPlace() {
        const data = {
            type: this.state.value,
            radius: this.state.radius

        }
        this.props.getParticularPlaces(data)
        this.props.navigation.navigate('homeRoute')
    }

    render() {

        return (


            < Container >
                <Content>
                    <Label>
                        Select Place
                        </Label>
                    <Picker
                        mode="dropdown"
                        placeholder="Select place"
                        note={false}
                        selectedValue={this.state.value}
                        onValueChange={this.selectedPlace.bind(this)}>

                        <Item label="Restaurant" value="restaurant" />

                        <Item label="Hospital" value="hospital" />

                        <Item label="Banks" value="bank" />

                        <Item label="School" value="school" />

                        <Item label="Dentist" value="dentist" />

                        <Item label="Doctor" value="doctor" />

                        <Item label="Embassy" value="embassy" />

                        <Item label="Gas Station" value="gas_station" />

                        <Item label="GYM" value="gym" />

                        <Item label="ATM" value="atm" />

                        <Item label="Cafe" value="cafe" />

                        <Item label="Airport" value="airport" />


                    </Picker>


                    <Label>
                        Select Radius
                        </Label>

                    <Picker
                        mode="dropdown"
                        placeholder="Select Radius"
                        note={false}
                        selectedValue={this.state.radius}
                        onValueChange={this.selectedRadius.bind(this)}
                    >

                        <Item label="500" value={500} />

                        <Item label="1000" value={1000} />

                        <Item label="1500" value={1500} />

                        <Item label="2000" value={2000} />

                        <Item label="2500" value={2500} />

                        <Item label="3000" value={3000} />

                        <Item label="3500" value={3500} />

                        <Item label="4000" value={4000} />

                        <Item label="4500" value={4500} />

                        <Item label="5000" value={5000} />

                    </Picker>
                    <Button onPress={this.getPlace.bind(this)} >
                        <Text>Get Places</Text>
                    </Button>
                </Content>
            </Container >

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nearby)

