import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#18011A',
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
