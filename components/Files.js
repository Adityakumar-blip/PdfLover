import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const Files = ({ navigation , route }) => {

    const [data , setData] = useState(route?.params?.data ?? [])

    const selectFiles = async () => {
        await DocumentPicker.getDocumentAsync()
    }

    return (
        <View style={style.container}>
            <Text style={style.filesHeading}>Uploaded Files</Text>
            <ScrollView>
            <View style={style.fileContainer}>
          {
            data.map((file , index) => (
                <View style={style.fileView} key={index}>
                    <Text >{file.name}</Text>
                </View>
            ))
          }
          </View>
          </ScrollView>
        </View>
    );
};

export default Files;


const style = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        gap : 30,
        padding : 20
    },
    filesHeading : {
        fontSize : 25,
        fontWeight : "700"
    },
    fileView : {
        borderColor : 'lightgrey',
        borderStyle : "solid",
        padding : 20,
        borderWidth : 2,
        borderRadius : 10,
    },
    fileContainer : {
        display : 'flex',
        gap : 15
    }
})
