import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, address, updated }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.address}>{address}</Text>
    <View style={styles.line}/>
    <Text style={styles.updated}>{updated}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item name={item.name} address={item.address} updated={item.updated} />;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} address={item.address} updated={item.updated}/>;
    }
    // filter of the description
    if (item.address.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} address={item.address} updated={item.updated}/>;
    }
  };

  return (
    <SafeAreaView 
      style={styles.list__container}
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}>
      
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    flex: 1,
    margin: 10,
    backgroundColor: "white"
  },
  item: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: 0,
    shadowOpacity: 0.4,
    
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  address: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
  },
  updated: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
});