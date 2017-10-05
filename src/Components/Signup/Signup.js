import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { View, Text, Button, AsyncStorage } from "react-native"
import firebase from 'firebase';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware/middleware';

function mapStateToProps(state) {
    return {
        counting: state,
        show_crime_report: state.MyReducer.show_crime_report,
        show_complaints_report: state.MyReducer.show_complaints_report,
        show_missing_report: state.MyReducer.show_missing_report
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: (obj) => dispatch(Middleware.signOut(obj))
    }
};

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            pass: '',
            doctors: []
        }
    }

    static navigationOptions = {
        title: "Create an account"
    }

    createAnAccount = () => {

        var obj = {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
        }

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(obj.email, obj.pass);
        promise.then((user) => {
            console.log(user + "your account is created");
        })
        promise.catch(e => obj.error.innerHTML = e.message);

        this.props.navigation.navigate('AppRoute');

    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Full Name</Label>
                            <Input onChangeText={(name) => this.setState({ name })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email Address</Label>
                            <Input onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(pass) => this.setState({ pass })} />
                        </Item>
                    </Form>
                    <Button title="Sign-Up" onPress={this.createAnAccount}></Button>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
