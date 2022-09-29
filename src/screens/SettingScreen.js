import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>
        <AntDesign
          name="customerservice"
          style={{color: 'red', fontSize: 50}}
        />
        <AntDesign name="windows" style={{color: 'red', fontSize: 50}} />
      </Text>
    </View>
  );
};

export default SettingScreen;
