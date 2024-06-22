import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";


export const CustomListItem = ({id, chatName, enterChat, makeMeTop}) => {
    const [chatMessages,setChatMessages] = useState([]);

    useEffect(()=>{
        const q = query(collection(db,"chats",id,"messages"),orderBy('timestamp','desc'));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            const items = querySnapshot.docs.map((doc)=>(            
                doc.data()
            ))
            setChatMessages(items);
        })
        return unsubscribe
    },[id])

    useEffect(()=>{if(chatMessages.length > 0) makeMeTop(id)},[chatMessages])

    return (
        <ListItem key={id} bottomDivider 
        onPress={()=>enterChat(id,chatName)}
        >
            <Avatar source={{
                uri: chatMessages[0]?.photoURL ||
                "https://th.bing.com/th/id/OIP.k1jkY-qgTlzYmLkF4R4XXgHaHa?pid=ImgDet&rs=1"
            }} rounded
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800",color:'black'}} >
                    {chatName ? chatName : ''}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    {chatMessages?.[0]?.displayName} {chatMessages?.[0] && ':'} {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    )
}


const styles = StyleSheet.create({
    container:{

    }
})