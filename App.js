import React, { useState , useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,Button
} from 'react-native';
import { Camera, BarCodeSettings } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import {BarCodeScanner} from 'expo-barcode-scanner';
const App = ({ navigation }) => {
  const [qrCodeEnable, setQrCodeEnable] = useState(false);
  const [pictureEnable, setPictureEnable] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
  };
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
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      alert("picture was taken");
      // navigation.navigate('Preview', { photo });
    }
  };

  const handleRecordVideo = async () => {
    if (cameraRef.current) {
      if (isRecording) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        const video = await cameraRef.current.recordAsync();
        // navigation.navigate('Preview', { video });
        alert("video is recorded");
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

  const handleQRCodeScan = () => {
     setQrCodeEnable(true);
  };

  const handlePictureSnap = () => {
    setPictureEnable(true);
  };

  return (
    <View style={styles.container}>
{pictureEnable ? (
  <><Camera
  style={styles.camera}
  type={cameraType}
  flashMode={flashMode}
  ref={cameraRef}
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
  </>

) : (qrCodeEnable) ?  <>

<BarCodeScanner
  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  style={StyleSheet.absoluteFillObject}
/>
{!scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

</> : 
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
}

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
  camera: {
    flex: 1,
    width: '100%',
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

export default App;
