import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ _id, name, address, date, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate("StoreDetails", {
        _id: _id,
        prevImages: [],
      });
    }}
  >
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.address}>{address}</Text>
    <View style={styles.line} />
    <Text style={styles.date}>{date}</Text>
  </TouchableOpacity>
);

// the filter
const List = ({ searchPhrase, setClicked, data, navigation }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Item
          key={item._id}
          _id={item._id}
          name={item.name}
          address={item.address}
          date={dayjs(item.date).format("MM/DD/YYYY")}
          navigation={navigation}
        />
      );
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          key={item._id}
          _id={item._id}
          name={item.name}
          address={item.address}
          date={dayjs(item.date).format("MM/DD/YYYY")}
          navigation={navigation}
        />
      );
    }
    // filter of the description
    if (
      item.address
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          key={item._id}
          _id={item._id}
          name={item.name}
          address={item.address}
          date={dayjs(item.date).format("MM/DD/YYYY")}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.list__container}
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
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
    marginTop: 10,
  },
  address: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    alignItems: "center",
    flexDirection: "row",
    height: "15%",
    width: "40%",
    marginTop: 10,
    marginBottom: 20,
  },
  imageButton: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#ff5959",
  },
  libraryButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#ff5959",
  },
});
