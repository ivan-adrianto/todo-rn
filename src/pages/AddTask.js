import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import Button from '../components/Button';
import React, {useEffect, useState} from 'react';
import {IconBack} from '../assets/icons';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../redux/AuthRedux';
import CryptoJS from 'crypto-js';

const AddTask = ({navigation}) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [status, setStatus] = useState('important');
  const [title, setTitle] = useState('');

  const dateInString = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const res = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return res;
  };

  const timeSplit = date.toLocaleTimeString().split(':');
  const timeZone = date.toLocaleTimeString().split(' ');
  const time = `${timeSplit[0]}:${timeSplit[1]} ${timeZone[1]}`;

  const addNewtask = async () => {
    if (!title) {
      return showAlert('Title must be filled');
    }
    const data = {
      title,
      date,
    };
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      'vocatest',
    ).toString();
    dispatch(AuthActions.addTask(ciphertext));
    navigation.navigate('home');
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <IconBack style={styles.backIcon} />
        <Text fontSize={20} color={'white'}>
          Create New Task
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text
              color={'#CCCCCC'}
              fontSize={14}
              style={styles.titlePlaceholder}>
              Task Title
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={val => setTitle(val)}
            />
          </View>
          <View style={styles.formItem}>
            <Text color={'#CCCCCC'} fontSize={14}>
              Choose Date
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPressIn={() => setShowDate(true)}>
              <Text>{dateInString()}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showDate}
              date={date}
              mode={'date'}
              onConfirm={date => {
                setShowDate(false);
                setDate(date);
              }}
              onCancel={() => {
                setShowDate(false);
              }}
            />
          </View>
          <View style={styles.formItem}>
            <Text color={'#CCCCCC'} fontSize={14}>
              Starting Time
            </Text>
            <TouchableOpacity
              onPress={() => setShowStart(true)}
              style={styles.input}>
              <Text>{time}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showStart}
              date={date}
              mode={'time'}
              onConfirm={date => {
                setShowStart(false);
                setDate(date);
              }}
              onCancel={() => {
                setShowStart(false);
              }}
            />
          </View>
          <View>
            <Text color={'#CCCCCC'}>Type Task</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                onPress={() => setStatus('important')}
                style={styles.typeItem}>
                <Text color={status === 'important' ? 'black' : '#CCCCCC'}>
                  Important
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStatus('secondary')}
                style={styles.typeItem}>
                <Text color={status === 'secondary' ? 'black' : '#CCCCCC'}>
                  Secondary
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          backgroundColor={'#FB9F33'}
          style={styles.button}
          onPress={() => addNewtask()}>
          Add New Task
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#4263EC',
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 38,
    paddingBottom: 31,
    height: 132,
  },
  backIcon: {
    marginBottom: 10,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 49,
    paddingTop: 39,
    position: 'relative',
  },
  titlePlaceholder: {
    textAlign: 'center',
  },
  formItem: {
    marginBottom: 27,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginTop: 10,
    paddingLeft: 15,
    height: 48,
    justifyContent: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    height: 48,
    width: 123,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
    marginTop: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    width: '100%',
  },
});
