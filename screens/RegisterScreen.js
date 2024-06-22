import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";  
import { StyleSheet, View,  } from "react-native";  
import { KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [imageUrl,setImageUrl] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Login"
        })
    },[navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(authUser=>{
            updateProfile(authUser.user,{
                displayName:name,
                photoURL:imageUrl || 'https://th.bing.com/th/id/R.95c74e73a0802296ef631dd71dfa09d2?rik=eIiF8VmPmhhzXw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-Image.png&ehk=YvjAOG2T71oFU41G13CCoak98yJU3f0YK669MQiOROg%3d&risl=&pid=ImgRaw&r=0'
            })
            // authUser.user.photoURL = imageUrl || 'https://th.bing.com/th/id/R.95c74e73a0802296ef631dd71dfa09d2?rik=eIiF8VmPmhhzXw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-Image.png&ehk=YvjAOG2T71oFU41G13CCoak98yJU3f0YK669MQiOROg%3d&risl=&pid=ImgRaw&r=0';
            // authUser.user.displayName = name; 
            
            // .update({
            //     displayName:name,
            //     photoURL: 
            // })
        }).catch(err=>{
            alert(err.message)
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            <StatusBar style="light"/>
            <Text h4 style={{marginBottom:50}} >Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name"
                autoFocus value={name} type="Text"
                onChangeText={(text)=>setName(text)}
                />
                <Input placeholder="Email"
                value={email} type="Email"
                onChangeText={(text)=>setEmail(text)}
                />
                <Input placeholder="Password"
                value={password} secureTextEntry
                onChangeText={(text)=>setPassword(text)}
                />
                <Input placeholder="profile picture url (optional)"
                value={imageUrl}
                onChangeText={(text)=>setImageUrl(text)}
                onSubmitEditing={register}
                />
                
            </View>
            <Button title="Register"
            onPress={register} raised
            containerStyle={styles.button}
            />
            <View style={{height:20}}/>

        </KeyboardAvoidingView>
    
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        gap:5,
        backgroundColor:"white"
    },
    button:{
        width:200,
        marginTop:10
    },
    inputContainer:{
        width:300,
    }
})