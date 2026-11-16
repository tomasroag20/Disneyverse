
import { Platform } from 'react-native';

import { initializeApp } from 'firebase/app';

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmt0Vc8df8C3Qa8XLeGesKxL1xzTGUxkM",
  authDomain: "disneyverse-77100.firebaseapp.com",
  projectId: "disneyverse-77100",
  storageBucket: "disneyverse-77100.firebasestorage.app",
  messagingSenderId: "834163350793",
  appId: "1:834163350793:web:7eff7c7bbf04515d96c7d8"
};

const app = initializeApp(firebaseConfig);

export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

export const db = getFirestore(app);
