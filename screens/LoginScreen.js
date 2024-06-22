

import react, {useEffect, useState} from "react";
import {Button, Input, Image} from 'react-native-elements'
import {StyleSheet, Text, View} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";

export const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                const uid = user.uid;
                navigation.replace('Home')
            } else {
            }
        });

        return unsubscribe;
    },[])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log(user);
            const uid = user.uid;
            // alert(user.user.displayName)
            navigation.replace('Home')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

    }

    return (
        <KeyboardAvoidingView behavior="" style={styles.container} >
            <StatusBar style="light"/>
            <Image source={{
                uri:"https://logos-download.com/wp-content/uploads/2020/06/Signal_Logo.png"
            }}    
            style={{
                height:200,width:200,
                borderRadius:10
            }}
            />
            <View style={styles.inputContainer} >
                <Input placeholder="Email" autoFocus type="Email"
                value={email} onChangeText={(text)=>setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="Password"
                value={password} onChangeText={(text)=>setPassword(text)}                    
                />
            </View>

            <Button containerStyle={styles.button} title="Login"
            onPress={signIn}
            />
            <Button containerStyle={styles.button} type="outline" title="Register"
            onPress={()=>{navigation.navigate('Register')}}        
            />
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        width:300,
        marginTop:20
    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        gap:5

    },
    button:{
        width:200,
        marginTop:10
    }
}) 