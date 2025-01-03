import { use, useCallback, useState } from "react";
import { View,Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constant/color";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../Ui/Button";

function PlaceForm(){
   const  [enterdTitle,setenteredTitle]=useState('');
   const[selectImage,setSelectImage]=useState()
   const[pickedLocation,setPickedLocation]=useState()
   function changeTitleHandler (enterdText){
    setenteredTitle(enterdText);
   }

   function takeImageHandler(imageUri){
    setSelectImage(imageUri);
   }

   const pickLocationHnadler=useCallback((location)=>{
    setPickedLocation(location);
   },[]);

   function  savePlaceHandler(){
    console.log(enterdTitle);
    console.log(selectImage);
    console.log(pickedLocation);
   }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enterdTitle}/>
            </View>
            <ImagePicker onTakeImage={takeImageHandler}/>
            <LocationPicker onLocationPick={pickLocationHnadler}/>
            <Button onPress={savePlaceHandler}>Add place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100
    }
})
