import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import * as firebase from "firebase";
import { Navigation, NavigationActions, StackNavigator } from 'react-navigation';


// Pages
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/ChatList'


let navOptionsLogout = {
  header: (navigation) => ({
    left: <Button
      title='Logout'
      color='#E8E8E8'
      onPress={() => {
        try {
          firebase.auth().signOut()
            .then(() => {
              console.log("Successfully logged out");
              const backAction = NavigationActions.back();
              navigation.dispatch(backAction);
            });

        } catch (error) {
          console.log(error);
        }
      }}
    />,
    titleStyle: {
      color: '#E8E8E8'
    },
    tintColor: '#E8E8E8',
    style: {
      backgroundColor: '#484848'
    }
  })
}

let navOptions = {
  header: (navigation) => ({
    titleStyle: {
      color: '#E8E8E8'
    },
    tintColor: '#E8E8E8',
    style: {
      backgroundColor: '#484848'
    }
  })
}


// Navigation stack configuration
const RNFirebaseChat = StackNavigator({
  Login: { screen: LoginPage, navigationOptions: navOptions },
  ChatList: { screen: ChatListPage, navigationOptions: navOptionsLogout },
});

AppRegistry.registerComponent('RNFirebaseChat', () => RNFirebaseChat);