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
  error: string | null;
  set: () => void;
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
  const [error, setError] = useState<string | null>(null);

  function set() {
    setError('');
  }

  async function signup(email: string, password: string, displayName: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .catch((err) => {
          const errCode = err.code;
          switch (errCode) {
            case 'auth/email-already-in-use':
              throw new Error('User already Exist');
          }
        })
        .then(() => {
          setError('');
          router.push('/');
        });
      await updateProfile(auth.currentUser!, {
        displayName: displayName,
      }).catch((err) => console.log(err));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .catch((err) => {
          const errCode = err.code;
          switch (errCode) {
            case 'auth/user-not-found':
              throw new Error('user not found');
            case 'auth/wrong-password':
              throw new Error('wrong password');
          }
        })
        .then(() => {
          setError(null);
          router.push('/');
        });
    } catch (err: any) {
      setError(err.message);
    }
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
    error,
    set,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
