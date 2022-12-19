import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

interface AuthContext {
  currentUser: any;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, displayName: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

interface ContextProps {
  children: React.ReactNode;
}
export default function Context(props: ContextProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, displayName: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser!, {
        displayName: displayName,
      }).catch((err) => console.log(err));
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password);
    router.push('/');
  }

  function logout() {
    signOut(auth);
    router.push('/');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
