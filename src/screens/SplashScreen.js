import React from 'react';
import {ActivityIndicator, View, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.background}>
      <ActivityIndicator size="large" color="#444444" />
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#212121',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 177,
  },
});

export default SplashScreen;
