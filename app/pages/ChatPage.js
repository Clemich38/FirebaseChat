import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  AlertIOS
} from 'react-native';
import firebase from "../firebase/Firebase";
import { NavigationActions } from 'react-navigation'


export default class ChatPage extends React.Component {

  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
})


