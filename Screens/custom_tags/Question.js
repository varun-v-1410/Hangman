// This JS file is used to display the question
// Import all the required tags and modules
import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Platform} from "react-native"


export default function Question({question, hint}){
    // This constant variable enables and disable hint option
    const [Hint,toggleHint] = React.useReducer(s => !s , false)
    return(
        <View style={styles.row}>
            <Text style={styles.question} /* This displays the question */>
                {question}
            </Text>
            <TouchableOpacity onPress={toggleHint} style={{alignSelf: "flex-end", marginHorizontal: 8}} /* This displays the hint buttom */>
                <Text style={styles.hint}>
                    Hint
                </Text>
            </TouchableOpacity>
            {/* If hint is on then it displays the hint */
            Hint && (
                <Text style={styles.hint}>{hint}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flex: 1,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 12,
        padding: 5
    },
    hint:{
        fontFamily: Platform.OS == "ios" ? 'Arial' : 'sans-serif-condensed', 
        color: "#fff", fontSize: 15
    },
    question:{
        fontFamily: Platform.OS == "ios" ? 'Arial' : 'sans-serif-condensed',
        fontSize: 20,color: "#fff",marginVertical: 10, marginHorizontal: 10
    }
})