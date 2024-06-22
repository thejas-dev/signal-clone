import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './screens/HomeScreen';
import { AddChat } from './screens/AddChat';
import { ChatScreen } from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle:{backgroundColor:"#2C68ED"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
}

export default function App() {
  return (
    
    <NavigationContainer >
      <Stack.Navigator screenOptions={globalScreenOptions} >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
