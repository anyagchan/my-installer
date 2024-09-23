import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import axios from "axios";

const QrScanner = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      console.log(
        `Bar code with type ${type} and data ${data} has been scanned!`
      );
      try {
        const parsedData = JSON.parse(data);
        const storeId = parsedData.store_id;
        console.log(storeId);
        const res = await axios.get(
          `http://10.206.32.44:4000/stores/${storeId}`
        );
        setInvalid(false);
        navigation.navigate("StoreDetails", { prevImages: [], _id: storeId });
      } catch (error) {
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 3000);
        setScanned(false);
        console.error("Error:", error);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          title="grant permission"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={[StyleSheet.absoluteFill, styles.camera]}
      >
        {invalid && (
          <View style={styles.invalidPop}>
            <Text style={styles.invalidText}>Invalid QR Code</Text>
          </View>
        )}
      </CameraView>
    </View>
  );
};

// {/* {scanned && (
//         <TouchableOpacity
//           title={"Tap to Scan Again"}
//           onPress={() => setScanned(false)}
//         />
//       )} */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 90,
  },
  invalidPop: {
    height: 40,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  invalidText: {
    color: "red",
    fontSize: 16,
  },
});

export default QrScanner;
