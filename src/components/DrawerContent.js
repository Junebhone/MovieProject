import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const DrawerContent = props => {
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="px-10 py-20">
          <View className="flex-row justify-between items-center ">
            <Text className="text-white text-5xl font-akrobat">Menu</Text>
            <TouchableOpacity>
              <XMarkIcon
                color="white"
                size={32}
                onPress={() => props.navigation.closeDrawer()}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row justify-between items-center py-1 mt-8">
            <Text className="text-[#FF3501] text-xl font-akrobat">All</Text>
            <Text className="text-[#FF3501] text-xl font-akrobat">12,332</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-1 mt-5">
            <Text className="text-white text-xl font-akrobat">Movies</Text>
            <Text className="text-white text-xl font-akrobat">5,332</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-1 mt-5">
            <Text className="text-white text-xl font-akrobat">TV Shows</Text>
            <Text className="text-white text-xl font-akrobat">2,000</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-1 mt-5">
            <Text className="text-white text-xl font-akrobat">Series</Text>
            <Text className="text-white text-xl font-akrobat">12,00</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-1 mt-5">
            <Text className="text-white text-xl font-akrobat">Live</Text>
            <Text className="text-white text-xl font-akrobat">20</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
