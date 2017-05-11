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
  
  authorTextStyle(author, me) {
    return {
      color: (author === me) ? '#ddd' : '#777',
      fontSize: 10,
      textAlign: (author === me) ? 'right' : 'left',
    }
  }

  bubbleStyle(author, me) {
    return {
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
      flexDirection: 'column',
      justifyContent: (author === me) ? 'flex-end' : 'flex-start',
      alignItems: (author === me) ? 'flex-end' : 'flex-start',
      borderRadius: 25,
      backgroundColor: (author === me) ? 'cornflowerblue' : '#fff',
    }
  }



  render() {
    return (
      <View style={this.bubbleStyle(this.props.item.author, this.props.me)}>
        <Text style={this.authorTextStyle(this.props.item.author, this.props.me)}>{this.props.item.author}</Text>
        <Text style={this.textStyle(this.props.item.author, this.props.me)}>{this.props.item.text}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
})