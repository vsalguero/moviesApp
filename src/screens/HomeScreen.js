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
import {fetchMovies} from '../server/services.js';
import Loading from '../components/Loading';

import {useFormik} from 'formik';
import * as yup from 'yup';

const HomeScreen = ({navigation}) => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [randNumber, setRandNumber] = useState(0);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: form => {
      navigation.navigate('Search', {term: form.searchTerm});
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchMovies(movies).then(data => {
      setMovies(data);
      setLoading(false);
      setRandNumber(Math.floor(Math.random() * 10));
    });
  }, []);

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
            value={formik.values.searchTerm}
            onChangeText={text => formik.setFieldValue('searchTerm', text)}
          />
          <Text style={styles.textError}>{formik.errors.searchTerm}</Text>
          <TouchableOpacity
            onKeyPress={e => e.key === 'Enter' && formik.handleSubmit}
            onPress={formik.handleSubmit}>
            <Image
              style={styles.searchImage}
              source={require('../assets/images/search.png')}
            />
          </TouchableOpacity>
        </View>

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

export default HomeScreen;

function initialValues() {
  return {
    searchTerm: '',
  };
}

function validationSchema() {
  return {
    searchTerm: yup.string().required('Field required'),
  };
}
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
    paddingBottom: 40,
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
    margin: 10,
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
    padding: 14,
    flex: 1,
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
    top: Dimensions.get('window').height * 0.07,
  },
  searchImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginHorizontal: 20,
    resizeMode: 'stretch',
  },
  textError: {
    color: '#ab0000',
    fontSize: 12,
  },
});
