import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
        source={require('./logo.png')}
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
});

export default QRScreen;
