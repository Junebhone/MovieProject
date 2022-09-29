import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {BlurView} from '@react-native-community/blur';

const images = [
  require('../assets/images/no-way-home-poster.jpeg'),
  require('../assets/images/thor-poster.jpeg'),
  require('../assets/images/jujutsukaisen.jpeg'),
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Banner = () => {
  const [imgActive, setImgActive] = useState(0);

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };
  return (
    <View className="rounded-lg mx-4 overflow-hidden mt-3">
      <View style={styles.wrap}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images?.map((e, index) => {
            return (
              <Image
                key={e}
                resizeMethod="contain"
                source={e}
                style={styles.wrap}
              />
            );
          })}
        </ScrollView>

        <View style={styles.wrapDot}>
          {images?.map((e, index) => (
            <Text
              key={e}
              style={imgActive == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: WIDTH - 25,
    height: HEIGHT * 0.2,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: '#FF3501',
  },
  dot: {
    margin: 3,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default Banner;
