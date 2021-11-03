import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const Images = [
    'https://cdn.dribbble.com/users/975591/screenshots/16677004/media/d8a65932400141197ed515e38292dbf9.png?compress=1&resize=1200x900',
    'https://cdn.dribbble.com/users/1149413/screenshots/16667921/media/91696117736e3aa1d80010c727a0c6e5.jpg?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/6178180/screenshots/16769723/media/47fe257d064006656d0706b1599297bd.jpg?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/8441383/screenshots/16576588/media/778e1bc6dfbee74e3c3beb93d5f55e9c.png?compress=1&resize=1200x900',
    'https://cdn.dribbble.com/users/27187/screenshots/16735737/media/f5c6d4fd820450d74a6a3cd841a6df4a.png?compress=1&resize=800x600',
  ];

  const {width, height} = Dimensions.get('screen');

  const imageW = width * 0.7;
  const imageH = height * 0.54;

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {Images.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`images-${index}`}
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={20}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={Images}
        keyExtractor={(_, i) => i.toString()}
        pagingEnabled
        horizontal
        bounces={false}
        renderItem={({item}) => (
          <View
            style={{
              width,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 20,
            }}>
            <Image
              source={{uri: item}}
              style={{
                width: imageW,
                height: imageH,
                resizeMode: 'cover',
                borderRadius: 16,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
