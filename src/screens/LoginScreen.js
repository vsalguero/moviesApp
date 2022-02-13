import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {TextInput} from 'react-native-paper';

import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <ActivityIndicator size="large" color="blue" animating={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          mode="outlined"
          label="Enter Email"
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          value={password}
          label="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => {
            login(email, password);
          }}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    elevation: 6,
    backgroundColor: '#13b7dc',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 6,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  logo: {
    width: 180,
    height: 130,
    resizeMode: 'stretch',
  },
});

export default LoginScreen;
