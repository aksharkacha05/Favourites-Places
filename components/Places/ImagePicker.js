import {Alert, Button, Image, View,Text, StyleSheet} from 'react-native'
import {launchCameraAsync , useCameraPermissions ,PermissionStatus,} from 'expo-image-picker'
import { useState } from 'react';
import {Colors} from '../../constant/color'
import OutlinedButton from '../Ui/OutlineButton';

function ImagePicker (){
    const [pickedImage, setPickedImage]= useState();

    const [cameraPermissionsInformation,requestPermisson] = useCameraPermissions();

    async function verifyPermission(){
        if(cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermisson();

            return permissionResponse.granted;
        }
        if(cameraPermissionsInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissons','you nedd to grant camera Permissons to use this app.');
            return false;
        }
        return true;
    }

    async function takeImageHandler(){
        const hasPermisson =  await verifyPermission();
        if(!hasPermisson){
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5,
        });

        // console.log(image);

        if (!image.canceled && image.assets && image.assets.length > 0) {
            const imageUri = image.assets[0].uri;
            setPickedImage({ uri: imageUri });
        } else {
            Alert.alert('Image capture cancelled');
        }
    }

    let imagePreview = <Text>No image taken yet</Text>;
    if (pickedImage) {
        imagePreview = <Image source={pickedImage} style={styles.image} />;
    }
    return(
        <View>
            <View style={styles.imagePreview}>
            {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}


export default ImagePicker

const styles = StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    image:{
        width:'100%',
        height:'100%'
    }
})