import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from "react-native";
import StarRating from "react-native-star-rating";
import { getMovie } from "../services/srvices";
import dateFormat from "dateformat";

const PlaceHolderImage = require("../assets/noimage.png");
const height = Dimensions.get("screen").height;

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLaoded] = useState(false);

  useEffect(() => {
    getMovie(movieId).then((movieData) => {
      setMovieDetail(movieData);
      setLaoded(true);
    });
  }, []);

  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              movieDetail.poster_path
                ? {
                    uri:
                      "https://image.tmdb.org/t/p/w500" +
                      movieDetail.poster_path,
                  }
                : PlaceHolderImage
            }
          />
          <View style={styles.container}>
            <Text style={styles.movietitle}>{movieDetail.title}</Text>
            {movieDetail.genres && (
              <View style={styles.genrescontainer}>
                {movieDetail.genres.map((genre) => {
                  return (
                    <Text style={styles.genre} key={genre.id}>
                      {" "}
                      {genre.name}{" "}
                    </Text>
                  );
                })}
              </View>
            )}

            <StarRating starSize={35} fullStarColor={'gold'} maxStars={5} rating={movieDetail.vote_average / 2} />
            <Text style={styles.overview}>
              {movieDetail.overview}
            </Text>
            <Text style={styles.release}>
             {"Released Date" + dateFormat(movieDetail.release_date, 'dS mmmm, yyyy')}
            </Text>
          </View>
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: "center",
    height: 200,
  },

  image: {
    height: height / 2,
  },

  movietitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },

  genrescontainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  genre: {
    marginRight: 10,
    fontWeight: "bold",
  },

  overview: {
      padding: 15,
  },

  release: {
 fontWeight: 'bold',
  }
});

export default Detail;
