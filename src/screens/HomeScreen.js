import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import api from '../api';
import {BlurView} from '@react-native-community/blur';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';
import FeaturedRow from '../components/FeaturedRow';
import Banner from '../components/Banner';


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   api
  //     .get('/movie/popular?language=en-US&page=1')
  //     .then(response => {
  //       setPopularMovies(response.data);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       setErrorMessage('Error Occured');
  //     }),
  //     wait(1000).then(() => setRefreshing(false));
  // });

  useEffect(() => {
    setLoading(true);
    api
      .get('/movie/popular?language=en-US&page=1')
      .then(response => {
        setPopularMovies(response.data);
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage('Error Occured');
      }),
      wait(1000).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get('movie/top_rated?language=en-US&page=1').then(response => {
      setTopRatedMovies(response.data);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    api.get('/movie/now_playing?language=en-US&page=1').then(response => {
      setNowPlayingMovies(response.data);
    });
  }, []);

  return (
    <View className="flex-1 bg-[#18011A] ">
      <SafeAreaView className="flex-1">
        {/* Header */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator color={'#FFFFFF'} />
          </View>
        ) : (
          <>
            {errorMessage ? (
              <View>
                <Text>Error occured</Text>
              </View>
            ) : (
              <View>
                <View className="flex-row justify-between items-center px-4">
                  <TouchableOpacity>
                    <BlurView
                      blurType="dark"
                      blurAmount={32}
                      reducedTransparencyFallbackColor="#FFFFFF"
                      style={{
                        borderRadius: 10,
                      }}>
                      <View className="p-2 rounded-lg">
                        <Image
                          resizeMode="contain"
                          source={require('../assets/icons/menu.png')}
                          className="w-8 h-8"
                        />
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                  <View>
                    <Text className="text-[#F6C700] text-3xl font-akrobat">
                      Movies Watch
                    </Text>
                  </View>
                  <View>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/Profile.png')}
                      className="w-12 h-12 rounded-md"
                    />
                  </View>
                </View>

                {/* Search */}
                <View className="flex-row items-center flex-1  py-4 mx-4 ">
                  <BlurView
                    style={{
                      flexDirection: 'row',
                      borderRadius: 10,
                    }}>
                    <BlurView
                      blurType="dark"
                      blurAmount={80}
                      reducedTransparencyFallbackColor="#FFFFFF"
                      x
                      style={{
                        flex: 1,
                      }}>
                      <View className="flex-row  space-x-2 items-center  p-3">
                        <MagnifyingGlassIcon color="white" size={24} />
                        <TextInput
                          placeholder="Search Here"
                          keyboardType="default"
                          placeholderTextColor={'gray'}
                          style={{
                            color: 'gray',
                          }}
                          className="font-akroba"
                        />
                      </View>
                    </BlurView>
                    <BlurView
                      blurType="materialDark"
                      blurAmount={80}
                      reducedTransparencyFallbackColor="black">
                      <View className="flex-row  items-center space-x-2 p-3">
                        <Text className="text-white font-akrobat">Filter</Text>
                        <AdjustmentsHorizontalIcon size={24} color="white" />
                      </View>
                    </BlurView>
                  </BlurView>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    marginHorizontal: 16,
                    paddingHorizontal: 16,
                    marginBottom: 10,
                  }}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row  space-x-10">
                  <Text className="text-white  font-akrobat text-xl">All</Text>
                  <Text className="text-white  font-akrobat text-xl">
                    Movies
                  </Text>
                  <Text className="text-white  font-akrobat text-xl">
                    TV Shows
                  </Text>
                  <Text className="text-white  font-akrobat text-xl">
                    Series
                  </Text>
                  <Text className="text-white  font-akrobat text-xl">Live</Text>
                </ScrollView>

                {/* Body */}
                <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                  {/* Banner */}
                  <Banner />
                  {/* Featured Rows */}
                  <FeaturedRow
                    title="Popular"
                    movieList={popularMovies.results}
                  />
                  <FeaturedRow
                    title="Top Rated"
                    movieList={topRatedMovies.results}
                  />
                  <FeaturedRow
                    title="Now Playing"
                    movieList={nowPlayingMovies.results}
                  />
                </ScrollView>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
