import React, { useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './ContextProvider';
import { doc, setDoc, deleteField, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// interface for product props
export interface Product {
  count: number;
  brand: string;
  description: string;
  discountPercentage: string;
  id: number;
  images: string[];
  title: string;
  thumbnail: string;
  stock: string;
  rating: number;
  price: number;
  category: string;
}

// interface for state
export interface StateProps {
  [title: string]: {
    count: number;
    brand: string;
    description: string;
    discountPercentage: string;
    id: number;
    images: string[];
    title: string;
    thumbnail: string;
    stock: string;
    rating: number;
    price: number;
    category: string;
  };
}

interface ShoppingListPorviderInterface {
  children: React.ReactNode;
}

interface ShoppingListInterface {
  addProduct: (args0: Product) => void;
  reduceProduct: (args0: Product) => void;
  handleDelete: (args0: Product) => void;
  shoppingList: StateProps;
  loading: boolean;
  error: string | null;
}

const ShoppingListContext = React.createContext({} as ShoppingListInterface);

export function useShoppingList() {
  return useContext(ShoppingListContext);
}

export default function ShoppingListProvider(
  props: ShoppingListPorviderInterface
) {
  const { currentUser } = useAuth();
  const [shoppingList, setShoppingList] = useState({} as StateProps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetching todos

  useEffect(() => {
    setShoppingList({});
    if (currentUser) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setShoppingList(docSnap.data().cart);
          } else {
            setShoppingList({});
          }
        } catch (err) {
          setError('failed to load cart');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  async function addProduct(product: Product) {
    const currentCount = shoppingList[product.title]?.count || 0;
    setShoppingList((prevState) => ({
      ...prevState,
      [product.title]: { ...product, count: currentCount + 1 },
    }));
    try {
      if (!currentUser) return;
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(
        userRef,
        {
          cart: {
            [product.title]: { ...product, count: currentCount + 1 },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  }

  //function to reduce the number of items in the list
  async function reduceProduct(product: Product) {
    const currentCount = shoppingList[product.title]?.count || 0;
    if (currentCount > 0) {
      setShoppingList((prevState) => ({
        ...prevState,
        [product.title]: {
          ...product,
          count: currentCount - 1,
        },
      }));
      if (currentCount === 1) {
        return handleDelete(product);
      }
      try {
        if (!currentUser) return;
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, {
          cart: {
            [product.title]: { ...product, count: currentCount - 1 },
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDelete(product: Product) {
    const tempObj = { ...shoppingList };
    delete tempObj[product.title];
    setShoppingList(tempObj);
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(
        userRef,
        {
          cart: {
            [product.title]: deleteField(),
          },
        },
        { merge: true }
      );
    }
  }

  const values = {
    addProduct,
    reduceProduct,
    shoppingList,
    loading,
    error,
    handleDelete,
  };

  return (
    <ShoppingListContext.Provider value={values}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}
