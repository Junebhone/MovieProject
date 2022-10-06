import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ChevronLeftIcon,
  PlayIcon,
  StarIcon,
} from 'react-native-heroicons/outline';
import api from '../api';
import Cast from '../components/Cast';

const MovieScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [credits, setCredits] = useState([]);

  const {id} = route.params;

  const convertMinsToTime = mins => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    setLoading(true),
      api
        .get(`movie/${id}`)
        .then(response => {
          setMovieDetails(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    setLoading(true),
      api
        .get(`movie/${id}/credits`)
        .then(response => {
          setCredits(response.data.cast);
          setLoading(false);
          // console.log(response.data.cast);
        })
        .catch(error => console.log(error));
  }, [id]);
  return (
    <ScrollView
      className="flex-1 bg-[#18011A] pb-24"
      contentContainerStyle={{
        paddingBottom: 60,
      }}>
      <View className="relative flex justify-center items-center ">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`,
          }}
          resizeMode="cover"
          className="w-full h-[400px] bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 rounded-full"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <ChevronLeftIcon size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute p-2 rounded-full"
          style={{
            backgroundColor: 'rgba(255,53,1,0.5)',
          }}>
          <PlayIcon size={36} color="white" fill="white" />
        </TouchableOpacity>
      </View>
      <View className="m-3">
        <Text className="font-akrobat text-3xl text-white">
          {movieDetails?.title}
        </Text>
        <View className="flex-row  justify-between gap-2">
          <View className="flex-row">
            {movieDetails.genres?.map((item, index) => (
              <Text className="font-akrobat text-base text-white" key={index}>
                {item.name}
              </Text>
            ))}
            <Text className="font-akrobat text-base text-white">
              - {convertMinsToTime(movieDetails?.runtime)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <StarIcon size={14} color="#FFC401" fill="#FFC401" />
            <StarIcon size={14} color="#FFC401" fill="#FFC401" />
            <StarIcon size={14} color="#FFC401" fill="#FFC401" />
            <StarIcon size={14} color="#FFC401" fill="#FFC401" />
            <StarIcon size={14} color="#FFC401" />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row py-3 gap-3">
            <TouchableOpacity
              className="p-3 rounded-xl justify-center items-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}>
              <Image
                source={require('../assets/icons/heart.png')}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 rounded-xl flex-row justify-center items-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}>
              <Image
                source={require('../assets/icons/imdb.png')}
                resizeMode="cover"
                className="w-16 h-6 rounded"
              />
              <Text className="text-xl font-akrobat pl-4 text-white">8.7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 rounded-xl flex-row justify-center items-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}>
              <Image
                source={require('../assets/icons/rotten.png')}
                resizeMode="cover"
                className="w-16 h-6 rounded"
              />
              <Text className="text-xl font-akrobat pl-4 text-white">93%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 rounded-xl flex-row justify-center items-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}>
              <Image
                source={require('../assets/icons/metacritic.png')}
                resizeMode="cover"
                className="w-16 h-6 rounded"
              />
              <Text className="text-xl font-akrobat pl-4 text-white">93%</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <Text className="text-white font-akrobat text-base mt-5">
            {movieDetails.overview}
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-white font-akrobat mx-3 text-xl my-4">
          Cast and Crew
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mx-3">
          {credits?.map((credit, index) => {
            return <Cast credit={credit} key={index} />;
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
