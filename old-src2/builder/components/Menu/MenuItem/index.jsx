import React from 'react';
import Styles from './styles.scss';
import View from '../../View';
import Text from '../../Text';

export default function MenuItem({ title = 'item' }) {
  return (
    <View className={Styles.MenuItem}>
      <Text>{title}</Text>
    </View>
  );
}
