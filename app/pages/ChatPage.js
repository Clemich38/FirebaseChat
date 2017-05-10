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
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';


export default class ChatPage extends React.Component {

  state = {
    scrollViewHeight: 0,
    inputHeight: 0,
    messages: [],
    userName: ""
  }

  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);


    this.state = {
      userName: props.navigation.state.params.userName
    };

  }

  componentDidMount() {

    this.messagesRef = firebase.app().database().ref().child('chatsGroups')
                                                      .child(this.props.navigation.state.params.key)
                                                      .child('messages');

    this.listenForMessages(this.messagesRef);
    
    let wait = new Promise((resolve) => setTimeout(resolve, 500));  // Smaller number should work
    wait.then(() => {
      this.refs.list.scrollToEnd({ animated: false });
    });
    
  }

  componentWillUnmount() {
    this.messagesRef.off();
  }

  componentDidUpdate() {
      this.refs.list.scrollToEnd({ animated: true });
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
        author: this.state.userName,
        timeStamp: 2
      })
  }

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  renderItem = ({ item }) => (
    <Message
      item={item}
      me={this.state.userName}/>
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          ref="list"
          data={this.state.messages}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
        <MessageInput onPress={this.addMessage.bind(this)} />
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


