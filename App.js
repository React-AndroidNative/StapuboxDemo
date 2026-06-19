import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Details from './src/ui/Details';
import YourDetails from './src/ui/Details/YourDetails';
import Feedback from './src/ui/Feedback';
import Login from './src/ui/Login';
import OTP from './src/ui/OTP';
import Splash from './src/ui/Splash';

const Stack = createNativeStackNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  if (!__DEV__) {
    console.log = () => {};
    console.debug = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
  }
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="YourDetails" component={YourDetails} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
