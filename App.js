import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarHeightContext,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import DownloadScreen from './src/screens/DownloadScreen';
import Ionic from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieScreen from './src/screens/MovieScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Movie"
        options={{headerShown: false}}
        component={MovieScreen}
      />
    </HomeStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#18011A',
            borderTopWidth: 0,
          },
          tabBarIcon: ({focused, icon, color}) => {
            let iconName;
            if (route.name == 'HomeStack') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name == 'Explore') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name == 'Category') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name == 'Download') {
              iconName = focused ? 'archive' : 'archive-outline';
            } else if (route.name == 'Setting') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            }
            return <Ionic name={iconName} size={24} color={color} />;
          },
        })}>
        <Tab.Screen
          name="HomeStack"
          options={{headerShown: false}}
          component={HomeStackScreen}
        />
        <Tab.Screen
          name="Explore"
          options={{headerShown: false}}
          tab
          component={ExploreScreen}
        />
        <Tab.Screen
          name="Category"
          options={{headerShown: false}}
          component={CategoryScreen}
        />
        <Tab.Screen
          name="Download"
          options={{headerShown: false}}
          component={DownloadScreen}
        />
        <Tab.Screen
          name="Setting"
          options={{headerShown: false}}
          component={SettingScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default App;
