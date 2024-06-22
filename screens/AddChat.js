import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 


export const AddChat = ({navigation}) => {
    const [input,setInput] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:"Chats",

        })
    },[navigation])

    const createChat = async() => {
        try{
            const docRef = await addDoc(collection(db,"chats"),{
                chatName:input
            })
            navigation.navigate('Home');
        }catch(ex){
            alert(ex.message)
        }
        
    }
 
    return (
        <View style={styles.container}>
            <Input type="text" placeholder="Enter a chat name"
            value={input} onChangeText={(text)=>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" color="black" size={24} />
            }            
            />
            <Button disabled={!input} onPress={createChat} title="Create a new chat" />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        height:'100%',
        padding:30

    }
})