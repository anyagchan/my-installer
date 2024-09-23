import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import LoginNav from "./components/loginNav";

import { Context } from "./AppContext.js";

const App = () => {
  const [userId, setUserId] = useState("");
  return (
    <Context.Provider value={[userId, setUserId]}>
      <NavigationContainer ref={navigationRef}>
        <LoginNav />
      </NavigationContainer>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
