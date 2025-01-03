import { Alert,Image,StyleSheet, View,Text } from "react-native"
import { getCurrentPositionAsync,useForegroundPermissions,PermissionStatus } from 'expo-location'

import OutlinedButton from "../Ui/OutlineButton"
import { Colors } from "../../constant/color";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/Location";

function LocationPicker ({onLocationPick}){
    const [pickedLocation,setPickedLocation]= useState();
    const [locationPermissonInformation, requestPermisson] = useForegroundPermissions();
    async function verifyPermission(){
         if(locationPermissonInformation.status === PermissionStatus.UNDETERMINED){
                    const permissionResponse = await requestPermisson();
        
                    return permissionResponse.granted;
                }
                if(locationPermissonInformation.status === PermissionStatus.DENIED){
                    Alert.alert('Insufficient Permissons','you nedd to grant location Permissons to use this app.');
                    return false;
                }
                return true;
    }

    async function getLocationHandler(){
        const hasPermisson = await verifyPermission();

        useEffect(()=>{
            onLocationPick(pickedLocation)
        },[pickedLocation,onLocationPick])

        if(!hasPermisson){
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude
        });
        
    }

    function pickedOnMapHnadler(){}
    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri:getMapPreview(pickedLocation.lat,pickedLocation.lng)}}/>
    }

    return<View>
        <View style={styles.mapPreview}>
          {locationPreview}  
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map"  onPress={pickedOnMapHnadler}>Pick on Map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:"center"
    },
    image:{
        width:'100%',
        height:'100%'
    }
})