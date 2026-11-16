
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import {
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../../firebase/config';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const ingresar = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        correo.trim(),
        password
      );

      alert('¡Bienvenido de nuevo!');

    } catch (error) {
      alert('No se pudo iniciar sesión: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DisneyVerse</Text>

      <Text style={styles.subtitle}>
        Tu aventura comienza aquí
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar sesión" onPress={ingresar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#17152B'
  },
  title: {
    color: '#F4D77B',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  }
});
