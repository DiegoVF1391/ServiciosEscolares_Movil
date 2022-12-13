import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import SolicitudesScreen from '../screens/SolicitudesScreen';
import BitacorasScreen from '../screens/BitacorasScreen';
import MostrarSolicitudesScreen from '../screens/MostrarSolicitudesScreen';
import MostrarBitacorasScreen from '../screens/MostrarBitacorasScreen';
import CrearBitacoraScreen from '../screens/CrearBitacoraScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Solicitudes" component={SolicitudesScreen} />
            <Stack.Screen name="Bitacoras" component={BitacorasScreen} />
            <Stack.Screen name="Mostrar Solicitudes" component={MostrarSolicitudesScreen} />
            <Stack.Screen name="Mostrar Bitacoras" component={MostrarBitacorasScreen} />
            <Stack.Screen name="Crear Bitacora" component={CrearBitacoraScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
