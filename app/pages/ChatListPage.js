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
import ListItem from '../components/ListItem'
import ActionButton from '../components/ActionButton'


export default class ChatListPage extends React.Component {

  static navigationOptions = {
    title: 'Chat List',
  };

  constructor(props) {
    super(props);

    // Realtime Database reference
    // Database/chats
    this.chatsRef = firebase.app().database().ref().child('chatsGroups');

    this.state = {
      chats: [],
      userName: props.navigation.state.params.userName
    };
  }

  componentDidMount() {
    this.listenForChats(this.chatsRef);
  }

  componentWillUnmount() {
    this.chatsRef.off();
  }

  listenForChats(chatsRef) {
    chatsRef.on('value', (snap) => {

      // get children as an array
      var chats = [];
      snap.forEach((child) => {
        chats.push({
          chatName: child.val().chatName,
          isPublic: child.val().isPublic,
          key: child.key
        });
      });

      this.setState({ chats: chats });

    });
  }

  async logout() {

    try {

      await firebase.auth().signOut()
        .then(() => {
          console.log("Successfully logged out");
          const backAction = NavigationActions.back();
          this.props.navigation.dispatch(backAction);
        });

    } catch (error) {
      console.log(error);
    }
  }

  addChat(name) {
    AlertIOS.prompt(
      'Create New chtat',
      null,
      [
        {
          text: 'Add',
          onPress: (name) => {
            this.chatsRef.push({
              chatName: name,
              isPublic: true
            })
          }
        },
      ],
      'plain-text'
    );
  }


  navigateToChat(item) {
    const { navigate } = this.props.navigation;
    navigate('Chat', { chatName: item.chatName, userName: this.state.userName, key: item.key })
  }

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={this.navigateToChat.bind(this, item)} />
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>
          Welcome {this.state.userName}
        </Text>
        <Button
          onPress={() => this.logout()}
          color={'#484848'}
          title="Logout"
        />
        <FlatList
          data={this.state.chats}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
        <ActionButton title="New Chat" onPress={this.addChat.bind(this)} />
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


