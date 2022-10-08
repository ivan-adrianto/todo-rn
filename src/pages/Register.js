import {
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import React, {useState} from 'react';
import {IconEmail, IconPassword, IconUsername} from '../assets/icons';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../redux/AuthRedux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const register = () => {
    if (!username) {
      return showAlert('username must be filled');
    }
    if (!email) {
      return showAlert('email must be filled');
    }
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!regex.test(email)) {
      return showAlert('Email is not valid');
    }
    if (!password) {
      return showAlert('password must be filled');
    }
    if (password.length < 6) {
      return showAlert('password must be at least 6 characters');
    }
    const data = {
      username,
      email,
      password,
    };

    dispatch(AuthActions.register(data));
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title} fontSize={28} bold color={'white'}>
        Register to Continue
      </Text>
      <View style={styles.divider}></View>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text color={'white'} fontSize={18}>
            Username
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'your username...'}
            onChangeText={text => setUsername(text)}
            value={username}></TextInput>
          <IconUsername style={styles.formIcon} />
        </View>
        <View style={styles.formItem}>
          <Text color={'white'} fontSize={18}>
            Email id
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'your email id...'}
            onChangeText={text => setEmail(text)}
            value={email}></TextInput>
          <IconEmail style={styles.formIcon} />
        </View>
        <View style={styles.formItem}>
          <Text color={'white'} fontSize={18}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'password'}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}></TextInput>
          <IconPassword style={styles.formIcon} />
        </View>
        <Button
          backgroundColor={'#030080'}
          style={styles.button}
          onPress={register}>
          REGISTER
        </Button>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate('login')}>
        <Text color={'white'} fontSize={14}>
          Already have an account?{' '}
        </Text>
        <Text color={'white'} fontSize={14} style={styles.signInText}>
          Sign in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: '#4263EC',
    alignItems: 'center',
    paddingTop: 65,
    paddingBottom: 30,
  },
  divider: {
    height: 4,
    width: 40,
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 30,
  },
  formItem: {
    marginBottom: 25,
    position: 'relative',
  },
  input: {
    borderRadius: 8,
    backgroundColor: 'white',
    maxHeight: 69,
    width: 300,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  formIcon: {
    position: 'absolute',
    right: 15,
    top: 50,
  },
  button: {
    marginTop: 15,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signInText: {
    textDecorationLine: 'underline',
  },
});
