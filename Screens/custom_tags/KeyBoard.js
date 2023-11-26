// This JS file is used to display the keyboard
// Import all the required tags and modules
import React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native"

// This component is used to create the alphabetical key
const Key = ({text, onPress, disabled})=>{
    return(
        <TouchableOpacity disabled={disabled} onPress={()=>onPress(text)} style={[styles.keycontainer, {opacity: disabled ? 0 : 100 /* Sets key visibility */}]}>
            <Text style={styles.key}>{text}</Text>
        </TouchableOpacity>
    );
}

export default function KeyBoard({onPress, correctLetters, wrongLetters}){
    // This string consists of all alphabetical letters
    const Keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return(
        <View style={styles.container}>
            {   // This section adds the alphabetical letter button for each letter in constant Keys
                Keys.split('').map((letter,index)=>{
                    const disable = correctLetters.includes(letter) || wrongLetters.includes(letter)/* This checks for correct and incorrect letters entered and 
                    sets disable to true or false */
                    return(
                        <Key key={index} text={letter} onPress={onPress} disabled={disable}/>
                    );
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginRight: 25,
        marginLeft: 25,
        marginVertical: 20,
        flexWrap: "wrap"
    },
    keycontainer:{
        width: 30,
        height: 38,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#fff",
        borderWidth: 1
    },
    key:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
    }
})