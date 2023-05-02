// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { CameraView } from 'react-native-vision-camera';
// import { Ionicons } from '@expo/vector-icons';

// const QRScreen = ({ navigation }) => {
//   const [qrCode, setQrCode] = useState('');
//   const [picture, setPicture] = useState('');

//   const handleQRCodeScan = () => {
//     navigation.navigate('Camera', { type: 'QR' });
//   };

//   const handlePictureSnap = () => {
//     navigation.navigate('Camera', { type: 'picture' });
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('./logo.jpeg')}
//         style={styles.logo}
//       />
//       <TouchableOpacity onPress={handleQRCodeScan} style={styles.button}>
//         <Text style={styles.buttonText}>Scan QR Code</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handlePictureSnap} style={styles.button}>
//         <Text style={styles.buttonText}>Snap Picture or Video</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
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
