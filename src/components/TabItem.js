import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './Text';
import {IconHome} from '../assets/icons';
import {IconMenuHor} from '../assets/icons';
import {IconPlus} from '../assets/icons';
import {IconSignal} from '../assets/icons';
import {IconProfile} from '../assets/icons';

const TabItem = ({onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'home') return <IconHome />;
    if (label === 'tasks') return <IconMenuHor />;
    if (label === 'add-task') return <IconPlus />;
    if (label === 'signal') return <IconSignal />;
    if (label === 'profile') return <IconProfile />;

    return <IconHome />;
  };
  ``;
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    justifyContent: "center"
  },
  text: isFocused => ({
    fontSize: 13,
    color: 'black',
    marginTop: 8,
  }),
  menuItem: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: "center",
  },
  menu: {
    height: 20,
    width: 20,
  },
});
