import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MovieCard from './MovieCard';

const FeaturedRow = ({id, title, popularMovies}) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="text-white font-akrobat text-xl">{title}</Text>
        <Text className="text-white opacity-50 font-akrobat text-xl">
          See All
        </Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4">
        {popularMovies?.map((movie, index) => {
          return <MovieCard movie={movie} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;