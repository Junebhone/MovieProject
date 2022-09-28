import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const MovieCard = ({movie, index}) => {
  return (
    <TouchableOpacity className="mr-3">
      <Image
        key={index}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        className="w-[120px] h-[180px] rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
