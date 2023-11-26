//This JS file acts as a tag to create inputbox
// Impot all the required tags and modules
import React from "react";
import {StyleSheet,View,Text} from "react-native"

export default function InputBox({answer, correctletters}){
    return(
        <View style={styles.container}>
            {/* The below condition maps the right answer and checks if the correct letters 
                includes the letters present in the answer string and returns the letter if the letter is present else
                returns '-' */
                answer.split('').map((letter,index)=>{
                    return(
                        <Text key={index} style={styles.text}>{correctletters.includes(letter) ? letter : '-'}</Text>
                    );
                })
                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: "#fff",
        fontSize: 28,
        fontFamily: 'RubixDirt',
        fontWeight: '500',
        letterSpacing: 5
    }
})