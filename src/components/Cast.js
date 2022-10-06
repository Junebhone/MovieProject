import {View, Text, Image} from 'react-native';
import React from 'react';

const Cast = ({credit}) => {
  return (
    <View className="justify-center my-2">
      <View className="mx-2">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${credit.profile_path}`,
          }}
          className="w-32 h-32 rounded-xl"
        />
      </View>
      <View className="mx-2 p-2 justify-center items-center">
        <Text className="text-white font-akrobat">{credit.name}</Text>
        <Text className="text-white font-akrobat">{credit.character}</Text>
      </View>
    </View>
  );
};

export default Cast;
