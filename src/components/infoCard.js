import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import ProgressBar from './ProgressBar';
const screen = Dimensions.get('window');
const InfoCard = ({movie}) => {
  return (
    <View style={styles.infoCard}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{movie.original_title}</Text>

        <Text style={{color: '#fff', fontSize: 10}}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={{color: '#fff', fontSize: 12}}>
          {movie.overview.length < 90
            ? movie.overview
            : movie.overview.substr(0, 90) + '...'}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProgressBar vote_average={movie.vote_average} />
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {movie.vote_average}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    paddingRight: 10,
    backgroundColor: '#032541',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: screen.width * 0.4,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    fontSize: 16,
    justifyContent: 'space-evenly',
  },
});
