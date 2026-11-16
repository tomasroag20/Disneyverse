
import { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator
} from 'react-native';

import {
  NavigationContainer
} from '@react-navigation/native';

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import {
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from './firebase/config';

import Login from './src/pantallas/Login';
import Registro from './src/pantallas/Registro';
import Inicio from './src/pantallas/Inicio';
import Reinos from './src/pantallas/Reinos';
import Coleccion from './src/pantallas/Coleccion';
import Desafio from './src/pantallas/Desafio';
import Perfil from './src/pantallas/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const suscripcion = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return suscripcion;
  }, []);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#211C3B'
          },
          headerTintColor: '#F4D77B',
          tabBarStyle: {
            backgroundColor: '#211C3B',
            borderTopColor: '#493D68'
          },
          tabBarActiveTintColor: '#F4D77B',
          tabBarInactiveTintColor: '#B5A9D0'
        }}
      >
        {usuario ? (
          <>
            <Tab.Screen
              name="Inicio"
              component={Inicio}
              options={{ title: 'Explorar' }}
            />

            <Tab.Screen
              name="Reinos"
              component={Reinos}
            />

            <Tab.Screen
              name="Colección"
              component={Coleccion}
            />

            <Tab.Screen
              name="Desafío"
              component={Desafio}
            />

            <Tab.Screen
              name="Perfil"
              component={Perfil}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={Login}
            />

            <Tab.Screen
              name="Registro"
              component={Registro}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
