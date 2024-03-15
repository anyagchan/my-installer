import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/searchBar';

function Home() {
  return (
    <View style = {styles.container}>
      <SearchBar/>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home;



