import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { View, Text, Button, AsyncStorage } from "react-native";
import firebase from 'firebase';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware/middleware';

function mapStateToProps(state) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            doctors: []
        }

    }

    static navigationOptions = {
        // header: null
        title: 'Login Page',
    }

    loginCheck = () => {

        var obj = {
            email: this.state.email,
            pass: this.state.pass
        }
        console.log(obj)
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(obj.email, obj.pass);
        promise.then((user) => {
            console.log("signIn successfully");
            this.props.navigation.navigate('homeRoute')
        })
        promise.catch(e => console.log("ERROR:", e.message));

    }

    render() {
        return (

            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>email</Label>
                            <Input onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(pass) => this.setState({ pass })} />
                        </Item>
                    </Form>
                    <Button title="Login" onPress={this.loginCheck}></Button>
                    <Button title="Create an account"
                        onPress={() => {
                            this.props.navigation.navigate('route')
                        }}>
                    </Button>
                </Content>

            </Container>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);