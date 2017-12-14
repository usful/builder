import React, { Component } from 'react';
import UUID from 'uuid-base62';

import AppState from './AppState';
import ViewModel from './builder/platform/mobile/models/ViewBlockModel';
import BlockView from './builder/platform/mobile/components/View';

const children = [];
for (let i = 0; i < 2; i++) {
  let subs = [];
  for (let j = 0; j < 5; j++) {
    let subsubs = [];
    for (let k = 0; k < 3; k++) {
      subsubs.push(
        new ViewModel({
          key: UUID.v4(),
          name: 'Child 4-' + i + j + k,
          style: {
            marginTop: 2,
            marginBottom: 2,
            marginLeft: 2,
            marginRight: 2,
            backgroundColor: '#444',
            width: 20,
            height: 20
          }
        })
      );
    }

    subs.push(
      new ViewModel({
        key: UUID.v4(),
        name: 'Child 4-' + i + j,
        style: {
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: '#999',
          width: 100,
          height: 50
        },
        children: subsubs
      })
    );
  }

  children.push(
    new ViewModel({
      key: UUID.v4(),
      name: 'Child 4-' + i,
      style: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#ddd',
        width: 400,
        height: 200
      },
      children: subs
    })
  );
}

/** TODO this will eventually be loaded dynamically */
AppState.block = new ViewModel({
  key: UUID.v4(),
  name: 'Clint',
  style: {
    paddingTop: 10,
    backgroundColor: '#900',
    position: 'absolute',
    top: 10,
    left: 20,
    height: 300,
    width: 600
  },
  children: [
    new ViewModel({
      key: UUID.v4(),
      name: 'Child 1',
      style: {
        paddingLeft: 20,
        backgroundColor: '#eee',
        width: 200,
        height: 200
      },
      children: [
        new ViewModel({
          key: UUID.v4(),
          name: 'Child 3',
          style: {
            paddingTop: 20,
            backgroundColor: '#00f',
            width: 100,
            height: 50
          }
        })
      ]
    }),
    new ViewModel({
      key: UUID.v4(),
      name: 'Child 2',
      style: {
        paddingTop: 20,
        backgroundColor: '#0f0',
        width: 600,
        height: 300
      },
      children: children
    })
  ]
});
