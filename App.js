import React from 'react';
import 'react-native-gesture-handler';
// Import the Navigation container and Stack navigator class
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from '@react-navigation/stack'
import {Asset} from "expo-asset"
// Import all the required Screens or functions
import Index from "./Screens/Index";
import Game from './Screens/Game';
// Import splash screen handler
import * as Splashscreen from "expo-splash-screen"
import Allcomplete from './Screens/Allcomplete';
import { useFonts } from 'expo-font';
// Import all required images
import indexBg from './assets/indexbg.png';
import blackboard from './assets/blackboard.png';

// Create an object for Stack Navigator
const Stack = createStackNavigator()
//Keep the splash screen visible while the resources are fetched
Splashscreen.preventAutoHideAsync();

export default function App() {
  // constant to store if app is ready for visibility
  const [appready,setappready] = React.useState(false);
  // loading te external font
  const [fontLoaded] = useFonts({
    RubixDirt: require('./assets/RubikDirt.ttf')
  })
  // Array of images to be loaded
  const images = [indexBg, blackboard];
  // load background image and custom as cache resource
  const cacheresources = async () => {
    try {
      const cacheimages = images.map(image => Asset.fromModule(image).downloadAsync());
      await Promise.all(cacheimages);
    } catch (err) {
      console.error("Failed to load assets", err);
    }
  }

  React.useEffect(() => {
    cacheresources().then(() => setappready(true));
  }, [images]);

  const layoutview = React.useCallback(async ()=>{
    if(appready && fontLoaded){await Splashscreen.hideAsync()}
  },[appready,fontLoaded])
  // check if app ready
  if(!appready){return null}
  // check if font loaded
  if(!fontLoaded){
    return null
}
  return (
    <NavigationContainer onReady={layoutview}>
      <Stack.Navigator /* Create navigator inside a navigation container and add the required Screens */>
        <Stack.Screen options={{headerShown: false}} name='Index' component={Index}/>
        <Stack.Screen options={{headerShown: false}} name='Game' component={Game}/>
        <Stack.Screen options={{headerShown: false}} name='AllComplete' component={Allcomplete}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}