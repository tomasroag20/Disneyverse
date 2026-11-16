
import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { obtenerPersonajes } from '../servicios/disneyApi';

import {
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';

import { auth, db } from '../../firebase/config';

export default function Inicio() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [error, setError] = useState('');

  const cargarPersonajes = async () => {
    try {
      setCargando(true);
      setError('');

      const resultado = await obtenerPersonajes(pagina);

      setPersonajes(resultado.personajes);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPersonajes();
  }, [pagina]);

  const guardarFavorito = async (personaje) => {
    try {
      const ref = doc(
        db,
        'usuarios',
        auth.currentUser.uid,
        'favoritos',
        String(personaje._id)
      );

      await setDoc(ref, {
        idPersonaje: personaje._id,
        nombre: personaje.name,
        imagen: personaje.imageUrl || '',
        peliculas: personaje.films || [],
        fecha: new Date().toISOString()
      });

      alert('Personaje agregado a tu colección');
    } catch (error) {
      alert(error.message);
    }
  };

  const filtrados = personajes.filter((p) =>
    p.name?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
        <TouchableOpacity onPress={cargarPersonajes}>
          <Text style={styles.text}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Universo Disney</Text>

      <Text style={styles.subtitle}>
        Descubre personajes de tus historias favoritas
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar personaje..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item._id)}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.imageUrl ||
                  'https://via.placeholder.com/150'
              }}
              style={styles.image}
            />

            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.movie}>
              {item.films?.[0] || 'Película no disponible'}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => guardarFavorito(item)}
            >
              <Text style={styles.buttonText}>
                ♡ Agregar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPagina(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
        >
          <Text style={styles.text}>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Página {pagina}</Text>

        <TouchableOpacity onPress={() => setPagina(pagina + 1)}>
          <Text style={styles.text}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#17152B'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F4D77B',
    marginVertical: 10
  },
  subtitle: {
    color: 'white',
    marginBottom: 15
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15
  },
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: '#302A4B',
    borderRadius: 15,
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center'
  },
  movie: {
    color: '#D6C8EF',
    fontSize: 11,
    marginVertical: 6
  },
  button: {
    backgroundColor: '#8062C7',
    padding: 9,
    borderRadius: 10
  },
  buttonText: {
    color: 'white'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12
  },
  text: {
    color: 'white'
  }
});
