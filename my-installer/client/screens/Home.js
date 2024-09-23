import React, { useState, useEffect, useFocusEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/searchBar";
import SearchResult from "../components/searchResult";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation, route }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://10.206.32.44:4000/stores");
        setData(res.data.stores);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("NewStoreForm", { prevImages: [] });
          }}
        >
          <Ionicons name="add" color="black" style={styles.addIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => {
            navigation.navigate("QrScanner");
          }}
        >
          <Ionicons
            name="qr-code-outline"
            color="black"
            style={styles.qrIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchResult}>
        {!data ? (
          <ActivityIndicator size="large" />
        ) : (
          <SearchResult
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
            navigation={navigation}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 90,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 20,
  },
  search: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  qrButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 15,
    shadowColor: "black",
    shadowOffset: 0,
    shadowOpacity: 0.4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  qrIcon: {
    fontSize: 30,
  },
  searchResult: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
