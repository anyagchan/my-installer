import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

const profileImage = require('../assets/icon.png');

function Profile() {
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.upper}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>Jane Santos</Text>
      </View>
      <View style = {styles.lower}>
        <View style = {styles.labels}>
          <Text style={styles.detailsLabel}>Date Joined</Text>
          <Text style={styles.detailsLabel}>Company</Text>
        </View>
        <View style = {styles.details}>
          <Text style={styles.detailsProfile}>ABC Company</Text>
          <Text style={styles.detailsProfile}>12/3/2023</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'left',
    justifyContent: 'left',
  },
  upper: {
    flex: 1,
    backgroundColor: "#ff5959",
    width: "100%",
    flexDirection: "row"
  },
  profileImage: {
    width: 100,
    height: 100,
    marginLeft: '5%',
    marginTop: '20%',
    borderRadius: 60
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: "25%",
    marginLeft: 20
  },
  lower: {
    flex: 4,
    width: "100%",
    flexDirection: "row"
  },
  labels: {
    flex: 1,
    flexDirection: "column",
    borderBottomColor: "gray",
    marginTop: 60,
    marginLeft: 40
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
  },
  detailsProfile: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "gray"
  }
})

export default Profile