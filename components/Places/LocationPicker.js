import { StyleSheet, View } from "react-native"
import OutlinedButton from "../Ui/OutlineButton"
import { Colors } from "../../constant/color";

function LocationPicker (){
    function getLocationHandler(){}

    function pickedOnMapHnadler(){}

    return<View>
        <View style={styles.mapPreview}></View>
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

})