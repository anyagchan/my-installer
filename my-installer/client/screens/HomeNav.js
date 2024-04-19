import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './Home.js'
import Search from './Search.js';
import NewStoreForm from '../components/newStoreForm.js';
import CameraScreen from '../components/cameraScreen.js';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="NewStoreForm" component={NewStoreForm} options={{ title: 'Add Store' }}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Camera' }}/>
      </Stack.Navigator>
  );
}



export default HomeNav;



