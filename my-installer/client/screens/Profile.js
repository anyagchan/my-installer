import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import axios from "axios";
import dayjs from "dayjs";

import { useIsFocused } from "@react-navigation/native";

import { Context } from "../AppContext.js";

const defaultImage = require("../assets/noProfile.png");

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useContext(Context);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://10.206.32.44:4000/users/${userId}`);
        user = res.data.user;
        setDate(user.date);
        setUsername(user.username);
        if (user.image) {
          setProfileImage(user.image.image_url);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUser();
  }, [userId, isFocused]);

  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://10.206.32.44:4000/users/${userId}`
      );
      console.log(res.data);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() =>
            navigation.navigate("CameraScreen", { prevImages: [], _id: 1 })
          }
        >
          <Image
            source={profileImage ? { uri: profileImage } : defaultImage}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{username}</Text>
      </View>
      <View style={styles.fields}>
        <View style={styles.labels}>
          <Text style={styles.detailsLabel}>Date Joined</Text>
          {/* <Text style={styles.detailsLabel}>Company</Text> */}
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsProfile}>
            {dayjs(date).format("MM/DD/YYYY")}
          </Text>
          {/* <Text style={styles.detailsProfile}>ABC Company</Text> */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signoutText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteUser}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "left",
    justifyContent: "left",
    marginBottom: 90,
  },
  upper: {
    height: "20%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: "100%",
    flexDirection: "row",
  },
  profileContainer: {
    marginLeft: "5%",
    marginTop: "18%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: "22%",
    marginLeft: 20,
  },
  fields: {
    height: "60%",
    width: "100%",
    flexDirection: "row",
  },
  labels: {
    flex: 1,
    flexDirection: "column",
    marginTop: 60,
    marginLeft: 40,
  },
  details: {
    flex: 2,
    flexDirection: "column",
    borderBottomColor: "gray",
    marginTop: 60,
  },
  detailsLabel: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#ff5959",
    fontWeight: "bold",
  },
  detailsProfile: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "gray",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    height: 40,
    width: "80%",
    borderRadius: 40,
  },
  signoutButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    width: "80%",
    borderRadius: 40,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  signoutText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Profile;
