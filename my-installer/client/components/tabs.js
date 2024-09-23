import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./homeNav.js";
import HistoryScreen from "../screens/History.js";
import ProfileScreen from "../screens/Profile.js";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            elevation: 0,
            backgroundColor: "#ffffff",
            height: 90,
          },
        }}
      >
        <Tab.Screen
          name="HomeNav"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="home"
                  color={focused ? "red" : "black"}
                  style={{ fontSize: 18 }}
                />
                <Text>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="time"
                  color={focused ? "red" : "black"}
                  style={{ fontSize: 18 }}
                />
                <Text>History</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="person"
                  color={focused ? "red" : "black"}
                  style={{ fontSize: 18 }}
                />
                <Text>Profile</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Tabs;
