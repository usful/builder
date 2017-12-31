import React, { Component } from 'react';
import AppState from '../../AppState';
import Styles from './styles.scss';

import View from '../components/View';

import { propertyArrayToObject } from '../platform/mobile/helpers';
import data from './generateTestData2';
import createClass from '../platform/renderer/createClass';

//Setup all the things.
createClass(data.HeaderBlock);
const UserCard = createClass(data.UserCardBlock);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className={Styles.App}>
        <UserCard key={data.userCardBlockInstance.id} {...propertyArrayToObject(data.userCardBlockInstance.values)} />
      </View>
    );
  }
}
