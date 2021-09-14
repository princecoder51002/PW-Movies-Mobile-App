import React, { useEffect, useState } from "react";
import { Video } from "expo-av";
import VideoPlayer from 'expo-video-player'
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  TouchableOpacity,
  ScrollView
} from "react-native";
import StarRating from "react-native-star-rating";
import { getMovie } from "../services/srvices";
import dateFormat from "dateformat";
import PlayButton from "../components/PlayButton";

const PlaceHolderImage = require("../assets/noimage.png");
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const Detail = ({ route, navigation }) => {
  const movieId = route.params;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLaoded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getMovie(movieId).then((movieData) => {
      setMovieDetail(movieData);
      setLaoded(true);
    });
  }, [movieId]);

  return (
    <View>
      
      {loaded && (
        
        <View>
          <ScrollView >
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
              <View style={styles.playbutton}>
                <PlayButton handlePress={videoShown} />
              </View>
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

              <StarRating
                starSize={35}
                fullStarColor={"gold"}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {"Released Date" +
                  dateFormat(movieDetail.release_date, "dS mmmm, yyyy")}
              </Text>
            </View>
            </ScrollView>

          <Modal animationType="slide" visible={modalVisible} supportedOrientations={['portrait', 'landscape']} onRequestClose={() => videoShown()}>
            <View style={styles.Videocontainer}>
              <View>
              
                <VideoPlayer
                  videoProps={{
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    },
                  }}
                  width={width}
                  height={height}
                  fullscreen={true}
                />

                <View style={styles.controlBar}></View>
              </View>
            </View>
          </Modal>
        </View>
       
      )}

      {!loaded && <ActivityIndicator size="large" />}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: "center",
    flexGrow: 1
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
    fontWeight: "bold",
  },

  playbutton: {
    position: "absolute",
    top: -36,
    right: 5,
  },

  Videocontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  controlBar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  listWrapper:{
     flexGrow:1,
},
});

export default Detail;
