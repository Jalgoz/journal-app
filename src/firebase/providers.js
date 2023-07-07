import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile 
} from 'firebase/auth';
import { FirebaseAuth } from './';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    }
  }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try{
    // Función de firebase para crear un usuario
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = result.user;

    // Para actualizar los datos del usuario loggeado
    // Siempre que retorne una promesa se pone el await por delante
    await updateProfile(FirebaseAuth.currentUser, { displayName }); 
    return {
      ok: true,
      uid, photoURL, email, displayName
    }
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async(email, password ) => {
  try{
    const { user: { displayName, uid, photoURL } } = 
      await signInWithEmailAndPassword(FirebaseAuth, email, password);

    return {
      ok: true,
      email, displayName, uid, photoURL,
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
};

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
};