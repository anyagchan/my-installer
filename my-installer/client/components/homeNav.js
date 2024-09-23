import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateAccount from "../screens/CreateAccount.js";
import Home from "../screens/Home.js";
import NewStoreForm from "./newStoreForm.js";
import StoreDetails from "./storeDetails.js";
import QrScanner from "./qrScanner.js";

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="NewStoreForm"
        component={NewStoreForm}
        options={{ title: "Add Store" }}
      />
      <Stack.Screen
        name="StoreDetails"
        component={StoreDetails}
        options={{ title: "Store Details" }}
      />

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ title: "Create Account" }}
      />
      <Stack.Screen
        name="QrScanner"
        component={QrScanner}
        options={{ title: "Scan QR" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;
