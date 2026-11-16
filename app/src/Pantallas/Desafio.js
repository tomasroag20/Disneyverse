import { db, auth } from "../../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

const guardarResultado = async (puntos, correctas, preguntas) => {
  try {
    const usuario = auth.currentUser;

    if (!usuario) {
      throw new Error("No hay un usuario autenticado");
    }

    await addDoc(collection(db, "resultados"), {
      uid: usuario.uid,
      puntos: puntos,
      correctas: correctas,
      preguntas: preguntas,
      fecha: serverTimestamp()
    });

    console.log("Resultado guardado correctamente");
  } catch (error) {
    console.error("Error guardando resultado:", error);
  }
};