// Import the required tags or modules
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, ImageBackground, Pressable} from "react-native";
import {useIsFocused} from "@react-navigation/native"
import indexBg from '../assets/indexbg.png';

export default function Index({navigation}){
    // constant that checks focus
    const focused = useIsFocused()
    //constant value that stores current level
    const [currentlevel,setcurrentlevel] = React.useState()
    // asynchronous function that is used to get current level from saved storage
    const getlevel = async ()=>{
        try{
            let level = await AsyncStorage.getItem("currentlevel")
            if(level != null){
                setcurrentlevel(level)
            }else{
                setcurrentlevel("1")
            }
        }catch(err){
            console.error("Failed to get level from AsyncStorage", err);
            Alert.alert("Error", "Failed to load level from storage");
        }
    }

    React.useEffect(()=>{
        getlevel()
    },[focused])
    return(
        <View style={styles.container}>
            <ImageBackground  source={indexBg} style={styles.container} resizeMode="stretch" /* Background image of the screen  */>
                <Pressable onPress={()=>{
                    //navigate to game screen
                    navigation.navigate('Game',{level: currentlevel})
                }} style={styles.container} 
                />
            </ImageBackground>
        </View>
    );
}

// add the required styles
const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
})