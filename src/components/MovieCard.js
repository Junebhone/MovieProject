import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MovieCard = ({movie}) => {
  const navigation = useNavigation();
  const {id, title, vote, overview, genre, poster_path, backdrop_path} = movie;

  return (
    <TouchableOpacity
      className="mr-3 shadow-lg"
      onPress={() => {
        navigation.navigate('Movie', {
          id,
        });
      }}>
      <Image
        key={id}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
        className="w-[120px] h-[180px] rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
