import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import SearchBar from '../components/searchBar';
import SearchResult from '../components/searchResult';

const stores = [
  {
    name: "Carmelita's Store",
    address: "123 ABC Street",
    updated: "3/13/2024"
  },
  {
    name: "Juan's Store",
    address: "4924 Upper Street",
    updated: "3/14/2024"
  },
  {
    name: "John's Store",
    address: "246 Down Street",
    updated: "3/15/2024"
  },
  {
    name: "John's Store",
    address: "246 Down Street",
    updated: "3/15/2024"
  }
]


const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();
  
  useEffect(() => {
    /*
    const getData = async () => {
      const apiResponse = await fetch(
        ""
      );
      const data = await apiResponse.json();
      setData(data);
    };

    getData();
    */
    setData(stores);
  }, []);
  

  return (
      <SafeAreaView style = {styles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style = {styles.searchResult}>
      { !data? (<ActivityIndicator size="large" />) : (

          <SearchResult

            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
          />

      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResult: {
    flex: 1,
    width: "100%",
  }
})

export default Home;



