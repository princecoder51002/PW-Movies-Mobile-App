import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { getPopularMovies } from './services/srvices';

export default function App() {

  const [movie, setmMovie] = useState('');
  const [error, setError] = useState(false);
  
  useEffect(() => {
    getPopularMovies().then(movies => {
      setmMovie(movies[0]);
   }).catch(error => {
       setError(error);
   });
  }, [])

  return (
    <View style={styles.container}>
      <Text>{movie.original_title}</Text>
      <Text>{movie.original_language}</Text>

{
  error && <Text style={{color: 'red'}}>Error in the Server</Text>
}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
