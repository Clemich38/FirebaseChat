import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import firebase from "../firebase/Firebase";
import { NavigationActions } from 'react-navigation'

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: "",
    }
  }

  async signin(userName) {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth()
        .signInAnonymously()
        .then(() => {
          console.log("Successfully logged in");
          navigate('ChatList', { userName: this.state.userName });
        });

    } catch (error) {
      console.log(error.toString())
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(userName) => this.setState({ userName })}
          value={this.state.userName}
          placeholder="User Name"
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Button
          onPress={() => this.signin(this.state.userName)}
          color={'#484848'}
          title="Login >"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  }
})