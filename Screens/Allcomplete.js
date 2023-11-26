// This screen will show when all levels are completed
// import the required tags and modules
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View,StyleSheet, ImageBackground, StatusBar, Text, Pressable} from "react-native"
// import background image
import blackboard from "../assets/blackboard.png"

export default function Allcomplete({navigation}){
    return(
        <View style={styles.container}>
            <ImageBackground source={blackboard} style={[styles.container,{alignItems: 'center',marginTop: StatusBar.currentHeight}]} resizeMode="stretch">
                <Text style={[styles.textshow,styles.container,{margin: 25}]}>
                    All the levels are completed{'\n'} You can reset the game to start again from first
                </Text>
                <Pressable style={{flex: 0.5, margin: 25,marginTop: 0}} onPress={async ()=>{
                    await AsyncStorage.removeItem("currentlevel")
                    navigation.popToTop()
                    navigation.navigate('Index')
                }}>
                    <Text style={styles.textshow}>
                        !! Reset !!
                    </Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textshow:{
        textAlignVertical:"center", textAlign: "center",
        color: '#fff', fontFamily: 'RubixDirt', fontSize: 30 
    }
})