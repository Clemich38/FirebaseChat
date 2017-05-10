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
import { NavigationActions } from 'react-navigation';
import Message from '../components/Message'


export default class ChatPage extends React.Component {

  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);

    this.messagesRef = firebase.app().database().ref().child('chatsGroups')
                                                      .child(props.navigation.state.params.chatName)
                                                      .child('messages');

    this.state = {
      messages: []
    };

  }

  componentDidMount() {
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', (snap) => {

      // get children as an array
      var messages = [];
      snap.forEach((child) => {
        messages.push({
          text: child.val().text,
          author: child.val().author,
          timeStamp: child.val().timeStamp,
          key: child.key
        });
      });

      this.setState({ messages: messages });

    });
  }

  addMessage(text) {
    this.messagesRef.push({
        text: text,
        author: 'test author',
        timeStamp: 2
      })
  }

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  renderItem = ({ item }) => (
    <Message
      item={item}/>
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
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


