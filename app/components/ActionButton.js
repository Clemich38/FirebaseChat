'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class ActionButton extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor='cornflowerblue'
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: 'cornflowerblue',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
})