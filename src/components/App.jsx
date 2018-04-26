import React, { Component } from 'react';
import Styles from './App.scss';

//Demo
import Blocks from '../demo/blocks';
import BrookfieldSurvey from './BrookfieldSurvey';

const { ProgressBar, MiniApp } = Blocks;

window.survey = BrookfieldSurvey;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Styles.App}>
        <div className={Styles.container}>
          <MiniApp instance={BrookfieldSurvey} />
        </div>
      </div>
    );
  }
}
