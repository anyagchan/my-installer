import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator} from 'react-native';
import SearchResult from '../components/searchResult';
import {stores} from '../components/storeList';

const History = () => {
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.searchResult}>
        <SearchResult
          searchPhrase=""
          data={stores}
          setClicked= {false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResult: {
    flex: 1,
    width: "100%",
  }
  
})

export default History