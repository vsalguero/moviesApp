import React, {useContext} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {userInfo, isLoading} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" animating={isLoading} />
      <Text style={styles.welcome}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
