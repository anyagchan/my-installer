import React, { useState, useContext } from "react";
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
import { Context } from "../AppContext.js";

const CreateAccount = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [requiredFields, setRequiredFields] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [userId, setUserId] = useContext(Context);

  const checkFields = () => {
    //password conditions: at least 8 characters
    console.log("running");
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setRequiredFields(false);
      console.log("false");
      return false;
    } else {
      setRequiredFields(true);
    }
    if (password.length < 8) {
      setPasswordLength(false);
      console.log("false");
      return false;
    } else {
      setPasswordLength(true);
    }
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      console.log("false");
      return false;
    } else {
      setPasswordMatch(true);
    }
    return true;
  };

  const createAccount = async () => {
    try {
      if (!checkFields()) {
        return;
      }

      const accountData = {
        username: username,
        password: password,
        date: new Date().toISOString(),
      };
      console.log(accountData);
      const res = await axios.post(
        "http://10.206.32.44:4000/users",
        accountData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsernameValid(true);
      await setUserId(res.data.user._id);
      navigation.navigate("Tabs");

      return res.data.userId;
    } catch (error) {
      console.error("Error:", error);
      setUsernameValid(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../assets/favicon.png")} style={styles.logo} />
        <Text style={styles.createTitle}>Create Account</Text>

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
          {!usernameValid && (
            <Text style={styles.errorMessage}>Username is taken.</Text>
          )}
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
          {!passwordLength && (
            <Text style={styles.errorMessage}>
              Password must be at least 8 characters.
            </Text>
          )}
          <Text style={styles.fieldName}>Confirm Password</Text>
          <View style={styles.field}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              style={styles.fieldInputPass}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
            />
            <TouchableOpacity
              style={styles.visibleButton}
              onPress={() => {
                showConfirmPassword
                  ? setShowConfirmPassword(false)
                  : setShowConfirmPassword(true);
              }}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                color="black"
                style={{
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          {!passwordMatch && (
            <Text style={styles.errorMessage}>Passwords do not match.</Text>
          )}
        </View>

        {!requiredFields && (
          <Text style={styles.errorMessage}>
            Please fill all required fields.
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.createLoginRedirect}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccount} onPress={createAccount}>
          <Text style={styles.createAccountText}>Create Account</Text>
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
  createTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
  createLoginRedirect: {
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
    backgroundColor: "white",
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
  createAccount: {
    width: "100%",
    marginTop: 20,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#ff5959",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountText: {
    color: "white",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default CreateAccount;
