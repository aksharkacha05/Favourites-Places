import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/Ui/IconButton';
import  {Colors} from './constant/color'
import { useEffect, useState } from 'react';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitalized,setDbInitalized] = useState(false);

  useEffect(()=>{
    init().then(()=>{
      setDbInitalized(true)
    }).catch(err=>{
      console.log(err);
      
    });
  },[]);

  if(!dbInitalized){
    return <AppLoading/>
  }

  return (<>
    <StatusBar style='dark'/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:Colors.primary500},
        headerTintColor:Colors.gray700,
        contentStyle:{backgroundColor:Colors.gray700}
      }}>
        <Stack.Screen name='AllPlaces' component={AllPlaces}
        options={({navigation})=>({
          title:'Your Favourite Places',
          headerRight:({tintColor})=><IconButton icon="add" size={30} color={tintColor} onPress={()=>navigation.navigate('AddPlace')}/>
        })}
        />
        <Stack.Screen name='AddPlace' component={AddPlace} options={{
          title:'Add a new Place'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  </>
    
  );
}
