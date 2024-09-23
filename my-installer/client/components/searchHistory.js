import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
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
  </TouchableOpacity>
);

// the filter
const List = ({ setClicked, data, navigation }) => {
  const sortedDates = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  const storesByDate = sortedDates.reduce((storeList, store) => {
    const date = dayjs(store.date).format("MM/DD/YYYY");
    if (!storeList[date]) {
      storeList[date] = [];
    }
    storeList[date].push(store);
    return storeList;
  }, {});

  return (
    <SafeAreaView
      style={styles.list__container}
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}
    >
      <ScrollView style={styles.scrollView}>
        {Object.keys(storesByDate).map((date) => (
          <View key={date}>
            <Text style={styles.dateText}>{date}</Text>
            {storesByDate[date].map((item) => (
              <Item
                key={item._id}
                _id={item._id}
                name={item.name}
                address={item.address}
                date={item.date}
                navigation={navigation}
              />
            ))}
          </View>
        ))}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  dateText: {
    margin: 10,
    marginTop: 20,
    fontWeight: "bold",
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
