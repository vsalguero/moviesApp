import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 312,
    height: 276,
  },
});

export default SplashScreen;
