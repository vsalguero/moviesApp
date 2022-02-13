import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import InfoCard from '../components/infoCard.js';

import {AuthContext} from '../context/AuthContext';
import {Card} from 'react-native-paper';
import {fetchMoviesSearch} from '../server/services.js';
import Loading from '../components/Loading';

const SearchScreen = ({navigation, route}) => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);
  //get the params searchTerm
  const {term} = route.params;

  useEffect(() => {
    setLoading(true);
    fetchMoviesSearch(term).then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        <View style={styles.bannerInfoCard}>
          <Text style={styles.bannerTitle}>
            {movies[0]?.original_title.substr(0, 20)}
          </Text>
          <Text style={styles.bannerOverview}>
            {movies[0]?.overview.substr(0, 80) + '...'}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.movieListCard}>
          <FlatList
            data={movies}
            numColumns={1}
            renderItem={({item, index}) => {
              return (
                <Card style={styles.movieCard}>
                  <InfoCard movie={item} />
                </Card>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  banner: {width: Dimensions.width, height: 150},
  bannerInfoCard: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 30,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(3,37,65,0.5)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  bannerOverview: {
    color: '#fff',
  },
  movieCard: {
    width: Dimensions.width,
    height: 200,
    margin: 5,
    borderWidth: 0,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  movieListCard: {
    top: Dimensions.get('window').height * 0.03,
  },
});
