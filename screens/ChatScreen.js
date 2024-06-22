import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, 
    TouchableWithoutFeedback, TextInput, ScrollView, 
    KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Avatar, Input } from "react-native-elements";
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { serverTimestamp, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export const ChatScreen = ({navigation, route}) => {
    const [input,setInput] = useState('');
    const [messages,setMessages] = useState([])
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerTitleAlign:"left",
            headerBackTitleVisible:false,
            headerBackVisible:false,
            headerTitle:()=>(
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginLeft:5
                }} >
                    <Avatar rounded source={{
                        uri: messages[0]?.data?.photoURL ||
                        "https://th.bing.com/th/id/OIP.k1jkY-qgTlzYmLkF4R4XXgHaHa?pid=ImgDet&rs=1"
                    }} 
                    />
                    <Text style={{
                        color:"white",
                        marginLeft:10,
                        fontWeight:700,
                        fontSize:16
                    }}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity style={{marginLeft:2,marginRight:10}} 
                onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{flexDirection:"row", justifyContent:"space-between", width:70, marginRight:6}} >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>

                </View>
            )
        })
    },[navigation, messages])

    const sendMessage = async() => {
        Keyboard.dismiss();
        if(!route.params.id){
            navigation.navigate('Home')
        }
        // await db.collection("chats").doc(route.params.id).collection("messages").add({
        //     timestamp:serverTimestamp(),
        //     message:input,
        //     displayName:auth?.currentUser?.displayName,
        //     email:auth?.currentUser?.email,
        //     photoURL:auth?.currentUser?.photoURL
        // })
        await addDoc(collection(db, "chats", route.params.id, "messages" ),{
            timestamp:serverTimestamp(),
            message:input,
            displayName:auth?.currentUser?.displayName,
            email:auth?.currentUser?.email,
            photoURL:auth?.currentUser?.photoURL
        })
        setInput('');
        fetchMessages();
    }

    useLayoutEffect(()=>{
        fetchMessages();
        const q = query(collection(db,"chats",route.params.id,"messages"),orderBy('timestamp','desc'));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            fetchMessages()
        })
    },[route])

    const fetchMessages = async() => {
        // const q = await 
        // const q = await query(collectionRef,orderBy('timestamp','dec'))
        const q = query(collection(db,"chats",route.params.id,"messages"),orderBy('timestamp','desc'))
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc)=>(
        {
            data:doc.data(),
            id:doc.id
        }))
        setMessages(items);        
    }
    
    return (
        <View style={{flex:1, backgroundColor:"white"}} >
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : 'height'}
            style={styles.container} keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                        <ScrollView contentContainerStyle={{paddingTop:15}} >
                            {messages.map(({id,data})=>(
                                data.email === auth?.currentUser?.email ? (
                                    <View key={id} style={styles.reciever} >
                                        <Avatar size={30} rounded position="absolute"
                                        bottom={-15} right={-5}
                                        // WEB
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5
                                        }}
                                        source={{
                                            uri:data.photoURL
                                        }}
                                        />
                                        <Text style={styles.recieverText} >
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender} >
                                        <Avatar size={30} rounded position="absolute"
                                        bottom={-15} left={-5}
                                        // WEB
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            left:-5
                                        }}
                                        source={{
                                            uri:data.photoURL
                                        }} />
                                        <Text style={styles.senderText} >
                                            {data.message}
                                        </Text>
                                        <Text style={styles.senderName} >
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )                                 
                            ))}
                        </ScrollView>
                        <View style={styles.footer} >
                            <TextInput style={styles.textInput} placeholder="Enter message here" 
                            value={input} onChangeText={(text)=>setInput(text)}
                            onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    footer:{
        paddingHorizontal:10,
        flexDirection:"row",
        marginVertical:15,
        width:"100%",
        alignItems:"center",
    },
    senderName:{
        left:10,
        marginTop:0,
        paddingTop:0,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    senderText:{
        color:"white",
        fontWeight:'500',
        marginLeft:10,
        marginBottom:7,
    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:5
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    }
})