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
import {AuthContext} from '../context/AuthContext';
import {Card} from 'react-native-paper';
import {fetchMovies} from '../server/services.js';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);
  const [randNumber, setRandNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies).then(data => {
      setMovies(data);
      setLoading(false);
      setRandNumber(Math.floor(Math.random() * 10));
    });
  }, [searchNow]);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movies[randNumber]?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        <View style={styles.bannerInfoCard}>
          <Text style={styles.bannerTitle}>
            {movies[randNumber]?.original_title.substr(0, 20)}
          </Text>
          <Text style={styles.bannerOverview}>
            {movies[randNumber]?.overview.substr(0, 80) + '...'}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder={'Search movies'}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
              setSearchNow(!searchNow);
            }}>
            <Image
              style={styles.searchImage}
              source={require('../assets/images/search.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.movieListCard}>
          <FlatList
            data={movies}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <Card style={styles.movieCard}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Movie', {movie: item})}>
                    <View style={{backgroundColor: '#fff'}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Image
                      source={{
                        uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                      }}
                      style={{width: Dimensions.width, height: 200}}
                    />
                  </TouchableOpacity>
                </Card>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  banner: {width: Dimensions.width, height: 200},
  bannerInfoCard: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
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
  inputCard: {
    position: 'absolute',
    top: -40,
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
    elevation: 9,
  },
  input: {
    padding: 20,
    flex: 1,
  },
  movieCard: {
    flex: 1,
    height: 200,
    margin: 5,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  movieListCard: {
    top: Dimensions.get('window').height * 0.12,
  },
  searchImage: {
    with: 40,
    height: 40,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
});
