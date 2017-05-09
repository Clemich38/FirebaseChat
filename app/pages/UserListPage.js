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


export default class UserListPage extends React.Component {

  static navigationOptions = {
    title: 'User List',
  };

  constructor(props) {
    super(props);

    // Realtime Database reference
    // Database/users
    this.usersRef = firebase.app().database().ref().child('users');
    this.addUser(props.navigation.state.params.userName);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.listenForUsers(this.usersRef);
  }

  listenForUsers(usersRef) {
    usersRef.on('value', (snap) => {

      // get children as an array
      var users = [];
      snap.forEach((child) => {
        users.push({
          userName: child.val().userName,
          connected: child.val().connected,
          key: child.key
        });
      });

      this.setState({users: users});
      // this.setState({
      //   todos: todos.sort((a, b) => {
      //     if ((a.done === false) && (b.done === true))
      //       return -1;
      //     else if ((a.done === true) && (b.done === false))
      //       return 1;
      //     else
      //       return 0;
      //   })
      // });

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

  addUser(name) {
    this.usersRef.push({
      userName: name,
      connected: true
    })
  }

  // toggleItemState(item) {

  //   this.todosRef.child(item.key).once('value', (snap) => {

  //     this.todosRef.child(item.key)
  //       .set({
  //         title: snap.val().title,
  //         done: snap.val().done === true ? false : true
  //       });
  //   });
  // }

  // removeItem(item) {
  //   this.todosRef.child(item.key).remove();
  // }

  shouldItemUpdate(prev, next) {
    return prev.item !== next.item;
  }

  renderItem = ({ item }) => (
    <ListItem
      item={item}/>
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.logout()}
          color={'#484848'}
          title="Logout"
        />
        <FlatList
          data={this.state.users}
          renderItem={this.renderItem}
          shouldItemUpdate={this.shouldItemUpdate}
        />
        {/*<ActionButton title="Add" onPress={this.addItem.bind(this)} />*/}
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


