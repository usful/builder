import React, { Component } from 'react';
import AppState from '../../AppState';
import Styles from './styles.scss';
import BlockDefinitionModel from '../models/BlockDefinitionModel';
import View from '../components/View';

import ProfileHeader from '../demo/blocks/ProfileHeader';

//Setup all the things.

const profileHeader = new BlockDefinitionModel({
  id: '1',
  type: 'Instance',
  blockVersion: 13,
  blockType: 'ProfileHeaderBlock',
  values: [
    {
      name: 'title',
      value: 'Porchetta & Co'
    },
    {
      name: 'hero',
      value: 'url(https://mona-production.s3.amazonaws.com/56b3633ccacd591737ccbce7.image)'
    },
    {
      name: 'logo',
      value: 'url(https://mona-production.s3.amazonaws.com/56a9248bf7c2916738e86a40.image)'
    }
  ]
});

window.profileHeader = profileHeader;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.listener = profileHeader.emitter.addListener('changed', () => this.setState({ts: Date.now()}));
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    return (
      <View className={Styles.App}>
        <hr/>
        <ProfileHeader instance={profileHeader}/>
      </View>
    );
  }
}
