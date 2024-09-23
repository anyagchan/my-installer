import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import uuid from "react-native-uuid";

const NewStoreForm = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const { prevImages } = route.params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (prevImages.length != 0) {
      setImages(prevImages);
    }
  }, [prevImages]);

  useEffect(() => {
    if (prevImages.length < images.length) {
      console.log(prevImages);
      console.log(images);
    }
  }, [images]);

  const setModal = (image_uri) => {
    setModalImage(image_uri);
    if (image_uri) {
      console.log(image_uri);
      setModalVisible(true);
    }
  };

  const createStore = async () => {
    try {
      const storeData = {
        name: name,
        address: address,
      };
      const res = await axios.post(
        "http://10.206.32.44:4000/stores",
        storeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.storeId;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postStore = async () => {
    try {
      if (name.trim() === "" || address.trim() === "") {
        Alert.alert("Error", "Please fill in the required fields");
        return;
      }

      const store_id = await createStore();
      if (images.length > 0) {
        for (const image of images) {
          const imageData = new FormData();
          imageData.append("image", {
            name: `${store_id}_${uuid.v4()}`,
            type: image.type,
            uri: image.uri,
          });

          console.log(imageData);

          const res = await axios.put(
            `http://10.206.32.44:4000/stores/${store_id}/image`,
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
      }
      navigation.navigate("Home");
      return store_id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteNewImage = async (img_url) => {
    index = images.findIndex((image) => image.uri == img_url);
    if (index == -1) {
      console.log("Error: Image not found in array");
    } else {
      images.splice(index, 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalImageContainer}>
              <ImageBackground
                source={{ uri: modalImage }}
                style={styles.modalView}
                resizeMode="cover"
              >
                <View style={styles.modalClose}>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      color="white"
                      style={{
                        fontSize: 30,
                        textShadowColor: "black",
                        textShadowRadius: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalDelete}>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => {
                      deleteNewImage(modalImage);
                      setModalVisible(false);
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      color="white"
                      style={{
                        fontSize: 30,
                        textShadowColor: "black",
                        textShadowRadius: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add a New Store</Text>
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldName}>Name</Text>
          <View style={styles.field}>
            <TextInput
              style={styles.fieldInput}
              placeholder="Store Name"
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
            />
          </View>
          <Text style={styles.fieldName}>Address</Text>
          <View style={styles.field}>
            <TextInput
              style={styles.fieldInput}
              placeholder="Store Address"
              onChangeText={(text) => {
                setAddress(text);
              }}
              value={address}
            />
          </View>
          <Text style={styles.fieldName}>Image</Text>
          <View style={styles.image}></View>
          <View style={styles.mapContainer}>
            {images.length > 0 &&
              images.map((image) => (
                <View key={image._id}>
                  <TouchableOpacity onPress={() => setModal(image.uri)}>
                    <Image
                      key={image._id}
                      source={{ uri: image.uri }}
                      style={styles.mappedImages}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => {
                navigation.navigate("CameraScreen", {
                  prevImages: images,
                  _id: 0,
                });
              }}
            >
              <Ionicons
                name="add-outline"
                color="white"
                style={{ fontSize: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.submitButton} onPress={postStore}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    marginLeft: "10%",
    marginTop: 40,
    alignItems: "left",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  fields: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 30,
    width: "80%",
    alignItems: "left",
  },
  field: {
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOffset: 0,
    shadowOpacity: 0.2,
    width: "100%",
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  fieldInput: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  fieldName: {
    fontSize: 18,
  },
  imageButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    backgroundColor: "#36454F",
    margin: 5,
  },
  imageText: {
    textAlign: "center",
    color: "#ff5959",
    fontWeight: "bold",
  },
  mapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -5,
    marginRight: -5,
  },
  mappedImages: {
    width: 90,
    height: 90,
    margin: 5,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  modalImageContainer: {
    width: "80%",
    aspectRatio: 1,
    flexDirection: "row",
  },
  modalView: {
    width: "100%",
    height: "100%",
  },
  modalClose: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  modalDelete: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalCloseButton: { margin: 10 },
  button: {
    alignItems: "flex-end",
    width: "80%",
    height: 40,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },
  submitButton: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ff5959",
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default NewStoreForm;
