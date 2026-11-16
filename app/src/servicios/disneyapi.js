
const API_URL = 'https://api.disneyapi.dev/character';

export async function obtenerPersonajes(page = 1) {
  const respuesta = await fetch(
    `${API_URL}?page=${page}&pageSize=30`
  );

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los personajes');
  }

  const json = await respuesta.json();

  // Normalizamos la respuesta para trabajar siempre con arrays.
  const personajes = Array.isArray(json.data)
    ? json.data
    : json.data
      ? [json.data]
      : [];

  return {
    personajes,
    info: json.info
  };
}

export async function buscarPersonaje(nombre) {
  const respuesta = await fetch(
    `${API_URL}?name=${encodeURIComponent(nombre)}`
  );

  if (!respuesta.ok) {
    throw new Error('Error al buscar personaje');
  }

  const json = await respuesta.json();

  return Array.isArray(json.data)
    ? json.data
    : json.data
      ? [json.data]
      : [];
}

export async function obtenerPersonajePorId(id) {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error('Personaje no encontrado');
  }

  const json = await respuesta.json();

  return json.data;
}
