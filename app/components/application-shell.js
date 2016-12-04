import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View, Image, TextInput, Navigator } from 'react-native';
import LoginScreen from '../screens/login-screen'
import Router from '../infrastructure/router'
import EventAggregator from '../infrastructure/event-aggregator';
import LoginCommand from '../commands/login-command';

export default class ApplicationShell extends Component {
  constructor(props) {
    super(props);
    const eventAggregator = new EventAggregator();
    this.router = new Router({eventAggregator});
    this.registerCommands(eventAggregator);
  }

  render() {
    return (
      <Navigator
        initialRoute={{component: LoginScreen, params: {}}}
        renderScene={this.router.routeTo.bind(this.router)}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }

  registerCommands(eventAggregator) {
    let command = new LoginCommand(eventAggregator)
    eventAggregator.subscribe("LOGIN", command);
  }
}
