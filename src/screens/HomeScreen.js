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

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies).then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, [searchNow]);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
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
            }}></TouchableOpacity>
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
                    <View style={{backgroundColor: '#444444'}}>
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
    backgroundColor: '#212121',
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
  },
  input: {
    marginTop: 26,
    padding: 10,
    flex: 1,
  },
  movieCard: {
    flex: 1,
    height: 200,
    margin: 5,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  movieListCard: {
    top: Dimensions.get('window').height * 0.12,
  },
});
