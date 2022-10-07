import {
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import DownloadScreen from './src/screens/DownloadScreen';
import Ionic from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieScreen from './src/screens/MovieScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/DrawerContent';
import {transform} from '@babel/core';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const WIDTH = Dimensions.get('screen').width;
const {width} = Dimensions.get('window');
const TAB_WIDTH = width / 5;

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

function Main() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="HomeStack"
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'ios-home',
            inActiveIcon: 'ios-home-outline',
          },
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Explore"
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'compass',
            inActiveIcon: 'compass-outline',
          },
        }}
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Category"
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'grid',
            inActiveIcon: 'grid-outline',
          },
        }}
        component={CategoryScreen}
      />
      <Tab.Screen
        name="Download"
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'download',
            inActiveIcon: 'download-outline',
          },
        }}
        component={DownloadScreen}
      />
      <Tab.Screen
        name="Setting"
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: {
            activeIcon: 'document-text',
            inActiveIcon: 'document-text-outline',
          },
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  const [translateX] = useState(new Animated.Value(0));
  const translateTab = index => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <SafeAreaView className="bg-[#18011A]">
      <View style={styles.tabBarContainer}>
        <View style={styles.slidingTabContainer}>
          <Animated.View
            style={[styles.slidingTab, {transform: [{translateX}]}]}
          />
        </View>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const tabBarIcon = options.tabBarIcon;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              <TabIcon
                tabIcon={tabBarIcon}
                isFocused={isFocused}
                index={state.index}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const TabIcon = ({isFocused, tabIcon, index}) => {
  const [translateY] = useState(new Animated.Value(0));
  const translateIcon = val => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-15);
    } else {
      translateIcon(0);
    }
  }, [index]);
  return (
    <>
      <Animated.View style={{transform: [{translateY}]}}>
        <Ionic
          name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
          size={isFocused ? 30 : 24}
          color={'white'}
        />
      </Animated.View>
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {width: WIDTH, backgroundColor: '#18011A'},
          swipeEnabled: false,
          drawerType: 'front',
        }}>
        <Drawer.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#18011A',
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  slidingTab: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#FF3501',
    bottom: 5,
  },
});

export default App;
