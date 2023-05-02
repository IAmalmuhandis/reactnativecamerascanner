// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera';
// import { Ionicons } from '@expo/vector-icons';

// const App = ({ route, navigation }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
//   const [isRecording, setIsRecording] = useState(false);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleCameraType = () => {
//     setCameraType(
//       cameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const handleFlashMode = () => {
//     setFlashMode(
//       flashMode === Camera.Constants.FlashMode.off
//         ? Camera.Constants.FlashMode.torch
//         : Camera.Constants.FlashMode.off
//     );
//   };

//   const handleTakePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       navigation.navigate('Preview', { photo });
//     }
//   };

//   const handleRecordVideo = async () => {
//     if (cameraRef.current) {
//       if (isRecording) {
//         cameraRef.current.stopRecording();
//         setIsRecording(false);
//       } else {
//         const video = await cameraRef.current.recordAsync();
//         navigation.navigate('Preview', { video });
//         setIsRecording(false);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={cameraType}
//         flashMode={flashMode}
//         ref={cameraRef}
//       />
//       <View style={styles.bottomButtons}>
//         <TouchableOpacity onPress={handleFlashMode} style={styles.bottomButton}>
//           <Ionicons name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleTakePicture} style={styles.bottomButton}>
//           <Ionicons name="camera" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleRecordVideo} style={styles.bottomButton}>
//           <Ionicons name={isRecording ? 'stop-circle' : 'videocam'} size={30} color={isRecording ? 'red' : 'white'} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   bottomButtons: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   bottomButton: {
//     padding: 10,
//   },
// });

// export default App;
import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to our Home Screen</Text>
      <Pressable
        onPress={() => navigation.navigate('Conference')}
        style={{
          backgroundColor: 'plum',
          padding: 10,
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Text>Conference</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Story')}
        style={{ backgroundColor: 'plum', padding: 10 }}>
        <Text>Story</Text>
      </Pressable>
    </View>
  );
}

function Conference({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Conference Details</Text>
    </View>
  );
}

function Story() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Our Story</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerLeft: (props) => {
            return (
              <>
                <Text>Menu</Text>
                {props.canGoBack && <HeaderBackButton {...props} />}
              </>
            );
          },
        })}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Conference" component={Conference} />
        <Stack.Screen name="Story" component={Story} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
