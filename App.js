import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { Ionicons } from '@expo/vector-icons';

const QRScreen = ({ navigation }) => {
  const [qrCode, setQrCode] = useState('');
  const [picture, setPicture] = useState('');

  const handleQRCodeScan = () => {
    navigation.navigate('Camera', { type: 'QR' });
  };

  const handlePictureSnap = () => {
    navigation.navigate('Camera', { type: 'picture' });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.jpeg')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={handleQRCodeScan} style={styles.button}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePictureSnap} style={styles.button}>
        <Text style={styles.buttonText}>Snap Picture or Video</Text>
      </TouchableOpacity>
    </View>
  );
};
const CameraScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      navigation.navigate('Preview', { photo });
    }
  };

  const handleRecordVideo = async () => {
    if (cameraRef) {
      if (isRecording) {
        cameraRef.stopRecording();
        setIsRecording(false);
      } else {
        const video = await cameraRef.recordAsync();
        navigation.navigate('Preview', { video });
        setIsRecording(false);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        ref={(ref) => setCameraRef(ref)}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={handleFlashMode} style={styles.bottomButton}>
          <Ionicons name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTakePicture} style={styles.bottomButton}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecordVideo} style={styles.bottomButton}>
          <Ionicons name={isRecording ? 'stop-circle' : 'videocam'} size={30} color={isRecording ? 'red' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bottomButton: {
    padding: 10,
  },
});

export default QRScreen;
