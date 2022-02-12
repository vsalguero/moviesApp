import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(21,21,21)',
      }}>
      <ActivityIndicator size="small" color="#ffffff" />
      <Text style={{color: '#ffffff', alignSelf: 'center'}}>Loading...</Text>
    </View>
  );
};

export default Loading;
