import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../redux/AuthRedux';
import {IconSearch} from '../assets/icons';
import CryptoJS from 'crypto-js';

const Home = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthActions.logout());

  const tasks = useSelector(state => state.auth.tasks);
  const decryptedTasks = JSON.parse(
    CryptoJS.AES.decrypt(tasks, 'vocatest').toString(CryptoJS.enc.Utf8),
  );
  const email = useSelector(state => state.auth.email);

  const getTime = value => {
    const date = new Date(value);
    const hour = date.toLocaleTimeString().split(':')[0];
    const minute = date.toLocaleTimeString().split(':')[1];
    const timeZone = date.toLocaleTimeString().split(' ')[1];
    return `${hour}:${minute}:${timeZone}`;
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text color={'white'} fontSize={16} style={styles.username}>
          Hey {email},
        </Text>
        <Text color={'white'} fontSize={24}>
          Welcome Back
        </Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder={'Search Task'}
            placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
          />
          <IconSearch style={styles.searchIcon} />
        </View>
      </View>
      <View style={styles.content}>
        <Text bold fontSize={18} style={styles.taskTitle}>
          Today Task
        </Text>
        <ScrollView
          style={styles.taskList}
          showsVerticalScrollIndicator={false}>
          {decryptedTasks.map((item, index) => (
            <View key={index} style={styles.taskItem}>
              <View style={styles.check}></View>
              <View style={styles.taskContent}>
                <Text fontSize={16}>{item.title}</Text>
                <Text color={'#CCCCCC'}>{getTime(item.date)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default Home;

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    paddingBottom: 150,
  },
  header: {
    backgroundColor: '#4263EC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 19,
    paddingTop: 39,
    paddingBottom: 29,
  },
  username: {
    opacity: 0.8,
    marginBottom: 5,
  },
  searchBar: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#2B49C3',
    borderRadius: 8,
    height: 48,
    paddingLeft: 15,
    paddingRight: 50,
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'none',
    marginTop: 25,
  },
  searchIcon: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 19,
    marginBottom: 20,
  },
  check: {
    height: 16,
    width: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(204, 204, 204, 1)',
    borderRadius: 100,
    marginRight: 10,
  },
  taskTitle: {
    marginBottom: 10,
  },
});
