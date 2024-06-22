import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView , View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomListItem } from "../components/CustomListItem";
import { Avatar, Icon } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; 
import { StatusBar } from "expo-status-bar";

export const HomeScreen = ({navigation}) => {
    const [chats,setChats] = useState([]);

    useEffect(()=>{
       fetchChats();
       const q = collection(db,"chats");
       const unsubscribe = onSnapshot(q,(querySnapshot)=>{
          fetchChats()
       })
    },[])

    const fetchChats = async() => {
        const querySnapshot  = await getDocs(collection(db,"chats"))
        console.log(querySnapshot.docs.map((doc)=>(
            {
                data:doc.data(),
                id:doc.id
            })))
        setChats(querySnapshot.docs.map((doc)=>(
        {
            data:doc.data(),
            id:doc.id
        })))
    }
    
    const signOutFunc = () => {
        signOut(auth).then(()=>{
            navigation.replace('Login')
        }).catch(err=>{
            alert(err.message)
        })
    }


    useLayoutEffect(()=>{
        fetchChats();
        navigation.setOptions({
            title:"Signal",
            headerStyle:{
                backgroundColor:"white",
            },
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    width:70,
                    marginRight:5,
                    justifyContent:"space-between"
                }} >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('AddChat')
                    }} 
                    activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            ),
            headerLeft:()=>(
                <View style={{marginRight:20,marginLeft:5}} >
                    <TouchableOpacity onPress={signOutFunc} 
                    activeOpacity={0.5} >
                        <Avatar source={{
                            uri:auth?.currentUser?.photoURL,
                        }} rounded 
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])    

    const enterChat = (id,chatName) => {
        navigation.navigate('ChatScreen',{
            id,chatName
        })
    }

    const makeMeTop = async(updateId) => {
        let chatsOfNow = [...chats];
        // console.log(chatsOfNow);
        let idx = chatsOfNow.findIndex(element=>{
          if(element.id === updateId){
            return true
          }
          return false  
        })
        let removedChat = chatsOfNow.splice(idx,1);
        chatsOfNow.unshift(removedChat[0])
        // console.log(chatsOfNow);
        setChats(chatsOfNow);
    }

    return (
        <View>
            <StatusBar style="auto"/>
            <ScrollView style={styles.container} >
                {
                    chats.map(({data,id})=>(
                        <CustomListItem id={id} key={id} 
                        chatName={data?.chatName}
                        enterChat={enterChat} 
                        makeMeTop={makeMeTop}
                        />
                    ))
                }
            </ScrollView>
        </View>
    
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",

    }
})