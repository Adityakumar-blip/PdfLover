import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ExternalStorage from 'expo-file-system'

const MainPage = ({ navigation }) => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);

    const requestStoragePermission = async () => {
      const { status } =  MediaLibrary;
      setIsPermissionGranted(status === 'granted');
    };
  
    useEffect(() => {
      requestStoragePermission();
    }, []);

//   const selectFiles = async () => {

//     if (!isPermissionGranted) {
//       console.log('Permission not granted. Please grant permission.');
//       return;
//     }

//     try {
//       const result = await DocumentPicker.getDocumentAsync({ multiple: true });

//       if (result.type === 'success') {
//         const files = result.assets;

//         for (const file of files) {
//           const filePath = file.uri;
//           const fileName = file.name;

//           try {
//             const fileContent = await RNFS.readFile(filePath, 'base64');
//             console.log(`Content of ${fileName}:`, fileContent);

//           } catch (error) {
//             console.error(`Error reading ${fileName}:`, error);
//           }
//         }

//         navigation.navigate('Files', { data: files });
//       }
//     } catch (error) {
//       console.error('Error picking files:', error);
//     }
//   };

  const displayDeviceFiles = async () => {
    const { status } = await ExternalStorage.requestPermissionsAsync();

    if (status === 'granted') {
      const { assets } = await MediaLibrary.getAssetsAsync();
      console.log('Device files:', assets);
      navigation.navigate('Files' , {data : assets})
    } else {
      console.log('Permission not granted.');
    }
  };

  return (
    <View style={style.container}>
      <Image
        style={{ width: 250, height: 250, marginBottom: 15 }}
        source={require('../assets/upload_file.png')}
      />
      <Text style={style.uploadHeading}>Upload your files</Text>
      <Text style={style.uploadPara}>Browse and choose your files</Text>

      <TouchableOpacity style={style.uploadButton} onPress={displayDeviceFiles}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Upload Files</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPage;


const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
  },
  uploadHeading: {
    fontSize: 32,
    color: 'blue',
    fontWeight: '900',
  },
  uploadPara: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    marginTop: 14,
  },
  uploadButton: {
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    marginTop: 32,
  },
});
