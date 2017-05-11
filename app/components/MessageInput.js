'use strict';

import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class MessageInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "",
    }
  }

  localPress() {
    this.props.onPress(this.state.text)
    this.setState({text: ""});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Message"
        />
        <TouchableHighlight
          style={styles.action}
          underlayColor='steelblue'
          onPress={this.localPress.bind(this)}>
          <Text style={styles.actionText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
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
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex: 1
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex: 5
  }
})