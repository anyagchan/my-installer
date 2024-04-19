import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  
  const [type, setType] = useState(CameraType.back);

  const cameraRef = useRef(null);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
        });
        return photo;
      } catch (e) {
          console.log(e);
      }
    }
  }
  
  return (
    <View style={styles.container}>
      { !showCamera ? (
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.takePhoto}
            onPress={async ()=> {
              const r = await takePhoto();

              if (!r.cancelled) {
                setImage(r.uri);
              }
              setShowCamera(false);
            }}
            >
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      ) : (
      <View>
        <View>
          {image && (
            <Image source = {{uri: image}} style = {styles.showImage}/>
          )}
        </View>
        <TouchableOpacity
          onPress = {() => setShowCamera(true)}>

        </TouchableOpacity>
      </View> 
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40
  },
});

export default CameraScreen