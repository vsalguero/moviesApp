import React from 'react';
import {ActivityIndicator, View, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.background}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'},
  logo: {
    width: 312,
    height: 276,
  },
});

export default SplashScreen;
