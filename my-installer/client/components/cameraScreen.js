import { Camera, CameraType } from "expo-camera/legacy";
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as RootNavigation from "../RootNavigation";
import uuid from "react-native-uuid";

import { Context } from "../AppContext.js";
import axios from "axios";

const CameraScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(true);
  const [imageURI, setImageURI] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const { prevImages, _id } = route.params;
  const [images, setImages] = useState([]);

  const [userId, setUserId] = useContext(Context);

  const isFocused = useIsFocused();

  useEffect(() => {
    setShowCamera(true);
  }, [isFocused]);

  useEffect(() => {
    if (prevImages.length != 0) {
      setImages(prevImages);
    }
  }, [prevImages]);

  const cameraRef = useRef(null);

  useEffect(() => {
    const handleImageSubmit = async () => {
      if (prevImages.length < images.length) {
        if (_id == 0) {
          navigation.navigate("NewStoreForm", { prevImages: images });
        } else if (_id == 1) {
          await addImage();
          navigation.navigate("Profile");
        } else {
          navigation.navigate("StoreDetails", {
            prevImages: images,
            _id: _id,
          });
          // navigation.navigate("StoreDetails", { prevImages: images, _id: _id });
        }
      }
    };
    handleImageSubmit();
  }, [images]);

  const addImage = async () => {
    try {
      if (images[0]) {
        profileImage = images[0];
        const imageData = new FormData();
        imageData.append("image", {
          name: `${userId}_${uuid.v4()}`,
          type: profileImage.type,
          uri: profileImage.uri,
        });

        const res = await axios.put(
          `http://10.206.32.44:4000/users/${userId}/image`,
          imageData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          addLibraryImage(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLibraryImage = (result) => {
    const newImage = {
      _id: images.length,
      name: result.assets[0].fileName,
      type: result.assets[0].type,
      uri:
        Platform.OS === "ios"
          ? result.assets[0].uri.replace("file://", "")
          : result.assets[0].uri,
    };
    setImages([...images, newImage]);
    console.log(images);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!photo.cancelled) {
          Platform.OS === "ios"
            ? photo.uri.replace("file://", "")
            : photo.uri.uri;
          setImageURI(photo.uri);
        }

        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRetake = () => {
    setShowCamera(true);
    setImageURI(null);
  };

  const handleSubmit = () => {
    const newImage = {
      _id: images.length,
      name: "0.jpg",
      type: "image",
      uri: imageURI,
    };
    setImages([...images, newImage]);
    console.log(images);
  };

  //https://www.youtube.com/watch?v=RmlekGDv8RU&t=235s
  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.reverseButton}
              onPress={pickImageAsync}
            >
              <Ionicons
                name="images-outline"
                color="white"
                style={styles.camIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.takeButton}
              onPress={async () => {
                const r = await takePhoto();
                setShowCamera(false);
              }}
            >
              <View style={styles.camIconOutline}>
                <Ionicons
                  name="camera-outline"
                  color="black"
                  style={styles.camIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reverseButton}
              onPress={toggleCameraType}
            >
              <Ionicons
                name="camera-reverse-outline"
                color="white"
                style={styles.camIcon}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View>
          <View style={styles.image}>
            {imageURI && (
              <Image source={{ uri: imageURI }} style={styles.showImage} />
            )}
          </View>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              style={styles.buttonOptions}
              onPress={handleRetake}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOptions}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Add Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    verticalAlign: "bottom",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    height: 100,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
  },
  reverseButton: {
    alignItems: "center",
  },
  takeButton: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  showImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  camIcon: {
    fontSize: 30,
  },
  camIconOutline: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer2: {
    position: "absolute",
    bottom: 10,
    height: 40,
    width: "100%",
    marginBottom: "8%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  buttonOptions: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 200,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default CameraScreen;
