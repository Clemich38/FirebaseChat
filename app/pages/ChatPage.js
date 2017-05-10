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
    messages: []
  }

  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);

    this.messagesRef = firebase.app().database().ref().child('chatsGroups')
                                                      .child(props.navigation.state.params.chatName)
                                                      .child('messages');

    // this.state = {
    //   messages: []
    // };

  }

  componentDidMount() {
    this.listenForMessages(this.messagesRef);
    let wait = new Promise((resolve) => setTimeout(resolve, 500));  // Smaller number should work
    wait.then(() => {
      this.list.scrollToEnd({ animated: false });
    });
    
  }

  componentDidUpdate() {
      this.list.scrollToEnd({ animated: true });
  }
  
  onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      scrollViewHeight: layout.height
    });
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

  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state,
      { chatHeight } = this.props;
    const scrollTo = chatHeight - scrollViewHeight + inputHeight;
    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate)
    }
  }
  _scrollToInput(reactRef) {
    this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
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
          ref={(ref) => { this.list = ref; }}
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


