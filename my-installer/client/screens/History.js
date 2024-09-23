import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import SearchHistory from "../components/searchHistory";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const History = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [clicked, setClicked] = useState(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchResult}>
        {!data ? (
          <ActivityIndicator size="large" />
        ) : (
          <SearchHistory
            searchPhrase=""
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
  searchResult: {
    flex: 1,
    width: "100%",
  },
});

export default History;
