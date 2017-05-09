import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import firebase from "./firebase/Firebase";
import { Navigation, NavigationActions, StackNavigator } from 'react-navigation';


// Pages
import LoginPage from './pages/LoginPage'
import ChatListPage from './pages/ChatListPage'


// let navOptionsLogout = ({ navigation, screenProps }) => {
//   /*headerLeft: <Button
//                 title='Logout'
//                 color='#E8E8E8'
//                 onPress={() => {
//                   try {
//                     firebase.auth().signOut()
//                       .then(() => {
//                         console.log("Successfully logged out");
//                         const backAction = NavigationActions.back();
//                         navigation.dispatch(backAction);
//                       });

//                   } catch (error) {
//                     console.log(error);
//                   }
//                 }}
//               />,*/

//   headerTintColor: '#E8E8E8',
//   headerTitleStyle: {
//     color: '#E8E8E8'
//   },
//   headerStyle: {
//     backgroundColor: '#484848'
//   }
// }

let navOptions = {
  headerTintColor: '#E8E8E8',
  headerTitleStyle: {
    color: '#E8E8E8'
  },
  headerStyle: {
    backgroundColor: '#484848'
  }
}


// Navigation stack configuration
const FirebaseChat = StackNavigator({
  Login: { screen: LoginPage, navigationOptions: navOptions },
  ChatList: { screen: ChatListPage, navigationOptions: navOptions },
});

AppRegistry.registerComponent('FirebaseChat', () => FirebaseChat);