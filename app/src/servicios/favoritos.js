import {
  collection,
  getDocs
} from 'firebase/firestore';

import { auth, db } from '../../firebase/config';

async function obtenerFavoritos() {
  const uid = auth.currentUser.uid;

  const referencia = collection(
    db,
    'usuarios',
    uid,
    'favoritos'
  );

  const resultado = await getDocs(referencia);

  return resultado.docs.map(documento => ({
    id: documento.id,
    ...documento.data()
  }));
}import { doc, deleteDoc } from 'firebase/firestore';

async function eliminarFavorito(id) {
  const uid = auth.currentUser.uid;

  await deleteDoc(
    doc(db, 'usuarios', uid, 'favoritos', String(id))
  );
}