import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import {
  getDocumentary,
  getFamilyMovies,
  getHorror,
  getPopularMovies,
  getPopularTv,
  getRomance,
  getUpComingMovies,
} from "../services/srvices";
import { SliderBox } from "react-native-image-slider-box";
import List from "../components/List";
import Error from "../components/Error";

const dimensions = Dimensions.get("screen");

const Home = ({navigation}) => {
  const [movieImages, setmMovieImages] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [popularFamilies, setPopularFamilies] = useState();
  const [documentary, setDocumentary] = useState();
  const [horror, setHorror] = useState();
  const [romance, setRomance] = useState();

  const getData = () => {
    return Promise.all([
      getUpComingMovies(),
      getPopularMovies(),
      getFamilyMovies(),
      getDocumentary(),
      getHorror(),
      getRomance(),
      getPopularTv(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upComingMovies,
          popularMovies,
          familyMovies,
          documentaryMovies,
          horrorMovies,
          RomanticMovies,
          PopularTvShows,
        ]) => {
          const movieImagesArray = [];
          upComingMovies.forEach((movie) => {
            movieImagesArray.push(
              "https://image.tmdb.org/t/p/w500" + movie.poster_path
            );
          });

          setmMovieImages(movieImagesArray);
          setPopularMovies(popularMovies);
          setPopularFamilies(familyMovies);
          setDocumentary(documentaryMovies);
          setHorror(horrorMovies);
          setRomance(RomanticMovies);
          setPopularTv(PopularTvShows);
          setLoaded(true);
        }
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.Slidercontainer}>
              <SliderBox
                images={movieImages}
                horizontal={true}
                dotStyle={styles.sliderStyle}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.3}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List title="Popular Movies" content={popularMovies} navigation={navigation} />
            </View>
          )}

          {horror && (
            <View style={styles.carousel}>
              <List title="Horror Movies" content={horror} navigation={navigation} />
            </View>
          )}

          {documentary && (
            <View style={styles.carousel}>
              <List title="Popular Documentaries" content={documentary} navigation={navigation}/>
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List title="Popular Tv's" content={popularTv} navigation={navigation} />
            </View>
          )}

          {popularFamilies && (
            <View style={styles.carousel}>
              <List title="Popular Family Shows" content={popularFamilies} navigation={navigation} />
            </View>
          )}

          {romance && (
            <View style={styles.carousel}>
              <List title="Romantic Movies" content={romance} navigation={navigation} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}

      {error && (
        <Error
          errorText1="Oops! Something Went Wrong"
          errorText2="Make Sure You Are Online And Restart the App"
        />
      )}
    </React.Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  Slidercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  sliderStyle: {
    height: 0,
  },
});
