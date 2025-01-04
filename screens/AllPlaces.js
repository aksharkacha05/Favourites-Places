import { useEffect, useState } from "react";
import {useIsFocused} from '@react-navigation/native'
import PlacesList from "../components/Places/PlacesList";

function AllPlaces ({route}){
    const[loadedPlace,setLoadedPlace] = useState([]);

    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused && route.params){
            setLoadedPlace(curPlace =>[...curPlace,route.params.place]);
        }
    },[isFocused,route])
    return <PlacesList places={loadedPlace}/>
}

export default AllPlaces;