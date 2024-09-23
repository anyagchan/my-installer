import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import uuid from "react-native-uuid";
import dayjs from "dayjs";

const StoreDetails = ({ navigation, route }) => {
  const { prevImages, _id } = route.params;

  const [images, setImages] = useState([]);
  const [store, setStore] = useState(null);
  const [reload, setReload] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [updated, setUpdated] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalImageType, setModalImageType] = useState(null);

  useEffect(() => {
    if (prevImages.length != 0) {
      setImages(prevImages);
    }
  }, [prevImages]);

  useEffect(() => {
    const getStore = async () => {
      try {
        const res = await axios.get(`http://10.206.32.44:4000/stores/${_id}`);
        const storeData = res.data.store;
        setStore(storeData);
        setName(storeData.name);
        setAddress(storeData.address);
        setUpdated(storeData.updated);
        setExistingImages(storeData.images);
        setReload(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getStore();
  }, [_id, reload]);

  const postStore = async () => {
    try {
      if (images.length == 0) {
        Alert.alert("Error", "No images to add");
        return;
      }
      const date = new Date().toISOString().replace(/[:\.]/g, "-");
      for (const image of images) {
        const imageData = new FormData();
        imageData.append("image", {
          name: `${_id}_${uuid.v4()}`,
          type: image.type,
          uri: image.uri,
        });

        const res = await axios.put(
          `http://10.206.32.44:4000/stores/${_id}/image`,
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
      navigation.navigate("Home");
      return _id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //existing or new
  const setModal = (image_uri, image_type) => {
    console.log(existingImages);
    setModalImage(image_uri);
    setModalImageType(image_type);
    if (image_uri) {
      setModalVisible(true);
    }
  };

  const deleteStore = async () => {
    try {
      const res = await axios.delete(`http://10.206.32.44:4000/stores/${_id}`);
      console.log(res.data);

      navigation.navigate("Home");
      return _id;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteExistingImage = async (img_url) => {
    try {
      const imageDeleteData = {
        image_url: img_url,
      };
      const res = await axios.delete(
        `http://10.206.32.44:4000/stores/${_id}/image`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: imageDeleteData,
        }
      );
      setReload(true);
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
    <SafeAreaView style={styles.page}>
      <ScrollView style={styles.scrollView}>
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
                      {
                        modalImageType == "existing"
                          ? deleteExistingImage(modalImage)
                          : deleteNewImage(modalImage);
                      }
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
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.details}>
            <Text style={styles.description}>Address</Text>
            <Text style={styles.content}>{address}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.description}>Last Updated</Text>
            <Text style={styles.content}>
              {dayjs(updated).format("MM/DD/YYYY")}
            </Text>
          </View>

          <Text style={styles.images}>Images</Text>
          <View style={styles.mapContainer}>
            {existingImages.length > 0 &&
              existingImages.map((image) => (
                <View key={image._id}>
                  <TouchableOpacity
                    onPress={() => setModal(image.image_url, "existing")}
                  >
                    <Image
                      key={image._id}
                      source={{ uri: image.image_url }}
                      style={styles.mappedImages}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            {images.length > 0 &&
              images.map((image) => (
                <View key={image._id}>
                  <TouchableOpacity onPress={() => setModal(image.uri, "new")}>
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
                  _id: _id,
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

          <View style={styles.button}>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteStore}>
              <Text style={styles.saveText}>Delete Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={postStore}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff5959",
    marginBottom: 20,
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
  },
  description: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  images: {
    marginTop: "15%",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  imageDate: {
    fontWeight: "bold",
  },
  image: {
    alignItems: "center",
    flexDirection: "row",
    height: "25%",
    width: 90,
    marginTop: 10,
    marginBottom: 20,
  },

  imageButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    backgroundColor: "#36454F",
    margin: 5,
  },

  mapContainer: {
    display: "flex",
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
  button: {
    alignItems: "flex-start",
    height: 40,
    marginTop: 20,
    flexDirection: "row",
  },
  saveButton: {
    justifyContent: "center",
    width: "47.5%",
    marginLeft: "2.5%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ff5959",
  },
  saveText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  newImages: {
    marginTop: "15%",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  deleteButton: {
    justifyContent: "center",
    width: "47.5%",
    marginRight: "2.5%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#404040",
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
});

export default StoreDetails;
