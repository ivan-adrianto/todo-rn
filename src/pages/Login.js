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
import {
  IconEmail,
  IconFB,
  IconLinkedin,
  IconPassword,
  IconTwitter,
  IconUsername,
} from '../assets/icons';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../redux/AuthRedux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

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
    const data = {
      email,
      password,
    };

    dispatch(AuthActions.login(data));
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title} fontSize={28} bold color={'white'}>
        Welcome to Todo!
      </Text>
      <View style={styles.divider}></View>
      <View style={styles.form}>
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
          LOGIN
        </Button>
      </View>
      <View style={styles.loginSosmed}>
        <View style={styles.horizontalLine}></View>
        <View style={styles.sosmedTextContainer}>
          <Text style={styles.sosmedText} color={'white'}>
            or continue with
          </Text>
        </View>
        <View style={styles.sosmedIconContainer}>
          <View style={styles.sosmedItem}>
            <IconFB />
          </View>
          <View style={styles.sosmedItem}>
            <IconTwitter />
          </View>
          <View style={styles.sosmedItem}>
            <IconLinkedin />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate('register')}>
        <Text color={'white'} fontSize={14}>
          Don't have an account?{' '}
        </Text>
        <Text color={'white'} fontSize={14} style={styles.signInText}>
          Sign Up
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
  loginSosmed: {
    position: 'relative',
    width: 300,
    marginTop: 20,
  },
  horizontalLine: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    top: 10,
  },
  sosmedTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sosmedText: {
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: '#4263EC',
  },
  sosmedIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15
  },
  sosmedItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 41,
    marginHorizontal: 10,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
