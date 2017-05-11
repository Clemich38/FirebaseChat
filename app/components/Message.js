import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class Message extends Component {

  // Dynamic style sheet returning method
  textStyle(author, me) {
    return {
      color: (author === me) ? '#fff' : '#333',
      fontSize: 16,
      textAlign: (author === me) ? 'right': 'left',
    }
  }

  bubbleStyle(author, me) {
    return {
      // backgroundColor: '#fff',
      borderBottomColor: '#eee',
      borderColor: 'transparent',
      borderWidth: 0,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 14,
      paddingBottom: 16,
      marginLeft: (author === me) ? 40 : 10,
      marginRight: (author === me) ? 10 : 40,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: (author === me) ? 'flex-end' : 'flex-start',
      alignItems: (author === me) ? 'flex-end' : 'flex-start',
      borderRadius: 25,
      backgroundColor: (author === me) ? 'cornflowerblue' : '#fff',
    }
  }



  render() {
    return (
      // <TouchableHighlight onPress={this.props.onPress}>
      <View style={this.bubbleStyle(this.props.item.author, this.props.me)}>
        <Text style={this.textStyle(this.props.item.author, this.props.me)}>{this.props.item.text}</Text>
      </View>
      // </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
  },
  delete: {
    color: 'tomato',
    fontSize: 16,
  }
})