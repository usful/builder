import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import generateTestData from './generateTestData';
import App from './builder/app';

ReactDOM.render(<App />, document.getElementById('builder'));
