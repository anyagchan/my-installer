import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login.js";
import CreateAccount from "../screens/CreateAccount.js";
import Tabs from "./tabs";
import CameraScreen from "./cameraScreen.js";

const Stack = createNativeStackNavigator();

const LoginNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "Camera", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginNav;
