import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const MovieCard = () => {
  return (
    <TouchableOpacity className="mr-3">
      <Image
        source={require('../assets/images/PosterDemo.jpeg')}
        className="w-[120px] h-[180px] rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
