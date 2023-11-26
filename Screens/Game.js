// This screen is the ui of the gme hangman
// Import the required tags or modules
import React from 'react'
import {View,Text,StyleSheet,StatusBar, ImageBackground, Pressable} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
// Import the background image
import blackboard from "../assets/blackboard.png"
// import all the custom tags
import Manfigure from './custom_tags/Manfigure'
import Question from './custom_tags/Question'
import InputBox from './custom_tags/InputBox'
// Import the jsonfile
import levels from "../assets/levels.json"
import KeyBoard from './custom_tags/KeyBoard'

export default function Game({route,navigation}){
    // stores every wrong word entered
    const [wrongwords,setwrongwords] = React.useState('')
    // stores every correct word entered
    const [correctwords, setcorrectwords] = React.useState('')
    // stores status of the game as win or loose
    const [status, setstatus] = React.useState('')
    // stores the boolean to allow or prevent keyboard touchabillity
    const [pointer, setpointer] = React.useState('auto')
    // stores the current level
    const currentlevel = route.params.level
    // stores the answer
    const answer = levels.levels[currentlevel].Ans
    // stores the value to allow to continue or retry the level
    const [cancontinue, setcontinue] = React.useState(false)
    // stores the value if game is over
    const [gameover,setgameover] = React.useState(false)
    // this checks if entered input is wrong or correct
    const storecorrectletters = (keyinput)=>{
        // this checks if answer includes entered key
        if(answer.includes(keyinput)){
            // if yes it add the enterd key to correctwords
            setcorrectwords(correctwords+keyinput)
            updatestatus(correctwords+keyinput)
        }else{// if not it adds the entered key to wrongwords
            setwrongwords(wrongwords+keyinput)
            if((wrongwords+keyinput).length >= 7){
                setstatus('lost')
                setpointer('none')
                setgameover(true)
            }
        }
    }
    // this updates the status of the game as win
    const updatestatus = async (c1)=>{
        let status = 'win'
        // creates an array of letters in answer
        const correctarray = Array.from(answer)
        // checks if each letter in the answer is included in correctwords and updates status accordingly
        correctarray.forEach(letter=>{
            if(!c1.includes(letter)){
                status = ''
            }
        })
        setstatus(status)
        if(status == "win"){
            setpointer('none')
            setcontinue(true)
            setgameover(true)
            if(currentlevel == "40"){
                navigation.replace('AllComplete')
            }
            else{
                await AsyncStorage.setItem("currentlevel",(parseInt(currentlevel)+1).toString())
            }
        }
    }
    //clear all the const variables to default settings
    const clearall = ()=>{
        setwrongwords('')
        setcorrectwords('')
        setstatus('')
        setpointer('auto')
        setcontinue(false)
        setgameover(false)
    }
    return(
        <View style={styles.container} >
            <ImageBackground source={blackboard} style={{flex: 1}} resizeMode="stretch">
                <Text style={styles.heading}
                >Level : {currentlevel}</Text>
                <View style={styles.problem}>
                    <Manfigure wrongwords={wrongwords.length}/>
                    <Question question={levels.levels[currentlevel].Problem+" ?"} hint={levels.levels[currentlevel].Hint} />
                </View>
                <View pointerEvents={pointer}>
                    <InputBox  answer={answer} correctletters={correctwords}  />
                    <KeyBoard correctLetters={correctwords} wrongLetters={wrongwords} onPress={(input)=>storecorrectletters(input)}/>
                </View>
                <Pressable style={[styles.continue,{opacity: gameover ? 100:0}]} onPress={()=>{
                    if(cancontinue){
                        navigation.setParams({level: (parseInt(currentlevel)+1).toString()})
                        clearall()
                    }else{
                        navigation.setParams({level: currentlevel})
                        clearall()
                    }
                }}>
                    <Text style={styles.continuetext}>{cancontinue ? "!! Next !!" : "!! Retry !!"}</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignContent: "center"
    },
    heading: {
        fontFamily: 'RubixDirt', fontSize: 35,textAlign: "center",paddingTop: StatusBar.currentHeight,color: "#fff"
    },
    problem: {
        marginTop: 30,marginLeft: 25,marginRight: 25,marginBottom: 30,flexDirection: "row",alignItems: "center"
    },
    continue:{
        marginLeft: 25, marginRight: 25, marginTop: 30, alignItems: 'center', justifyContent: 'center',
    },
    continuetext:{
        fontFamily: "RubixDirt", fontSize: 35, color: "#fff"
    }
})