import {View, Text, Image} from 'react-native';
import React from 'react';

const Cast = ({credit}) => {
  return (
    <View className="flex-row w-1/2 space-x-2 my-2">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${credit.profile_path}`,
        }}
        className="w-20 h-20 rounded-xl"
      />
      <View className="justify-center gap-2">
        <Text className="text-white font-akrobat">{credit.name}</Text>
        <Text className="text-white font-akrobat">{credit.character}</Text>
      </View>
    </View>
  );
};

export default Cast;
