import {Alert, Button, View} from 'react-native'
import {launchCameraAsync , useCameraPermissions ,PermissionStatus} from 'expo-image-picker'

function ImagePicker (){

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
                return
            }
        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5,
        });
        console.log(image);
        
    }
    return(
        <View>
            <View>

            </View>
            <Button title='take Image ' onPress={takeImageHandler}/>
        </View>
    )
}


export default ImagePicker