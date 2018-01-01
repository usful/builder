import React, { Component } from 'react';
import AppState from '../../AppState';
import Styles from './styles.scss';

import View from '../components/View';

import { propertyArrayToObject } from '../platform/mobile/helpers';
import data from './generateTestData2';
import createClass from '../platform/renderer/createClass';

//Setup all the things.
const HeaderCard = createClass(data.HeaderBlock);
const UserCard = createClass(data.UserCardBlock);
window.userCardBlockInstance = data.userCardBlockInstance;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.listener = data.userCardBlockInstance.emitter.addListener('changed', () => this.setState({ts: Date.now()}));
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    return (
      <View className={Styles.App}>
        <hr/>
        <UserCard {...propertyArrayToObject(data.userCardBlockInstance.values)} />
        <hr/>
        <HeaderCard text="Heyyy"/>
        <hr/>
        <UserCard name="Test!" margin={40} />
      </View>
    );
  }
}
