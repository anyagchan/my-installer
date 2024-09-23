import React, { useState, useContext, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import { Context } from "../AppContext.js";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const [valid, setValid] = useState(true);
  const [userId, setUserId] = useContext(Context);

  const isFocused = useIsFocused();

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isFocused]);

  const handleLogin = async () => {
    try {
      const accountData = {
        username: username,
        password: password,
      };
      const res = await axios.post(
        "http://10.206.32.44:4000/users/login",
        accountData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data.message);
      await setUserId(res.data.user._id);
      navigation.navigate("Tabs");
      setValid(true);
    } catch (error) {
      console.error("Error:", error);
      setValid(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../assets/favicon.png")} style={styles.logo} />
        <Text style={styles.loginTitle}>Login</Text>

        <View style={styles.fields}>
          <Text style={styles.fieldName}>Username</Text>
          <View style={styles.field}>
            <TextInput
              autoCapitalize="none"
              style={styles.fieldInput}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
            />
          </View>
          <Text style={styles.fieldName}>Password</Text>
          <View style={styles.field}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              style={styles.fieldInputPass}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
            <TouchableOpacity
              style={styles.visibleButton}
              onPress={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                color="black"
                style={{
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!valid && (
          <Text style={styles.errorMessage}>
            Invalid login name or password.
          </Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.loginRedirect}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: "90%",
    width: "70%",
    marginBottom: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
    height: 80,
    width: 80,
  },
  loginTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  loginRedirect: {
    fontSize: 14,
    color: "grey",
  },
  fields: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "left",
  },
  field: {
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOffset: 0,
    shadowOpacity: 0.2,
    width: "100%",
    height: 35,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 15,
    flexDirection: "row",
  },
  fieldInput: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  fieldInputPass: {
    width: "80%",
    height: "100%",
    marginLeft: "5%",
  },
  visibleButton: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldName: {
    fontSize: 16,
  },
  login: {
    width: "100%",
    marginTop: 20,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#ff5959",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
