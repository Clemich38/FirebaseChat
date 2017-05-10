import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class Message extends Component {

  // Dynamic style sheet returning method
  textStyle(author) {
    return {
      color: '#333',
      fontSize: 16,
    }
  }

  render() {
    return (
      // <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={this.textStyle(this.props.item.author)}>{this.props.item.text}</Text>
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
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delete: {
    color: 'tomato',
    fontSize: 16,
  }
})