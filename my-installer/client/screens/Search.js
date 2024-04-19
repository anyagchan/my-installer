import React from 'react'
import { View, Button, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import { Feather, Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';



const logoImage = require('../assets/icon.png');

const Search = ({navigation}) => {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.logoSection}>
            <Image source={logoImage} style={styles.logoImage}/>
        </View>
        <TouchableOpacity style = {styles.buttonSection} onPress = {() =>{ navigation.navigate('Search')}}>
            <View style = {styles.button}>
                <Ionicons name='search' color='black' style = {styles.searchIcon}/>
            </View>
            <View style = {styles.button}>
                <Ionicons name='camera' color='black' style = {styles.searchIcon}/>
            </View>
        </TouchableOpacity>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'white'

    },
    logoSection: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonSection: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'top',
      flexDirection: 'row',
      marginTop: 20
    },
    logoImage: {
      width: 200,
      height: 200,
      marginTop: '15%'
    },
    button: {
        height: 90,
        width: 90,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOpacity: 30,
        shadowOffset: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    searchIcon: {
        fontSize: 30
    }
    
    
  })

export default Search