import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import {addStore} from '../components/storeList';

const NewStoreForm = ({ navigation }) => {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")


  const handleAddItem = () => {
    console.log(name);
    console.log(address);
    if (name.trim() === '' || address.trim() === ''){
      Alert.alert('Error', 'Please fill in the required fields');
      return;
    }
    const newItem = { name: name, address: address };
    addStore(newItem);
    setName("");
    setAddress("");
    navigation.navigate('Home');
  };

  return (
    
    <View style = {styles.container}>
      <View style = {styles.header}>
        <Text style = {styles.headerText}>Add a New Store</Text>
      </View>
      <View style = {styles.fields}>
          <Text style = {styles.fieldName}>Name</Text>
          <View style = {styles.field}>
            <TextInput 
              style = {styles.fieldInput} 
              placeholder="Store Name" 
              onChangeText = {(text)=>{setName(text)}}
              value = {name}/> 
          </View>
          <Text style = {styles.fieldName}>Address</Text>
          <View style = {styles.field}>
            <TextInput 
              style = {styles.fieldInput} 
              placeholder="Address" 
              onChangeText = {(text)=>{setAddress(text)}}
              value = {address}/> 
          </View>
      </View>
      <View style = {styles.button}>
        <TouchableOpacity style = {styles.submitButton} 
            onPress={handleAddItem}>
            <Text style = {styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    marginLeft: 40,
    marginTop: 40,
    alignItems: 'left',
  },
  headerText: {
    fontWeight:'bold',
    fontSize: 20
  },
  fields: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    width: '100%',
    alignItems: 'left',
  },
  field: {
    backgroundColor: '#ffffff',
    shadowColor: "black",
    shadowOffset: 0,
    shadowOpacity: 0.2,
    width: '80%',
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20
  },
  fieldInput: {
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  fieldName: {
    fontSize: 18,
  },
  button: {
    alignItems: 'flex-end',
    width: '80%',
    height: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  submitButton: {
    justifyContent: 'center',
    width: '40%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: "#ff5959",
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }

  
})

export default NewStoreForm