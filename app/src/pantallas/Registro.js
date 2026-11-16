
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import { auth, db } from '../../firebase/config';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {
    if (!nombre.trim() || !correo.trim() || !password) {
      alert('Completa todos los campos');
      return;
    }

    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        correo.trim(),
        password
      );

      await setDoc(doc(db, 'usuarios', resultado.user.uid), {
        nombre: nombre.trim(),
        correo: correo.trim(),
        fechaRegistro: serverTimestamp(),
        puntos: 0
      });

      alert('¡Bienvenido a DisneyVerse!');

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

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

      <Button title="Registrarme" onPress={registrar} />
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
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 15,
    borderRadius: 10
  }
});
