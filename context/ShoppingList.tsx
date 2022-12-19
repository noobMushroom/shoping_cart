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
interface StateProps {
  [id: number]: {
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
  }, []);

  async function addProduct(product: Product) {
    const userRef = doc(db, 'users', currentUser.uid);
    if (!(product.id in shoppingList)) {
      setShoppingList((prevState) => ({
        ...prevState,
        [product.id]: { ...product, count: 1 },
      }));
      try {
        if (!currentUser) return;
        await setDoc(
          userRef,
          {
            cart: {
              [product.id]: { ...product, count: 1 },
            },
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      const updatedProduct = {
        ...product,
        count: shoppingList[product.id].count + 1,
      }; // updating the product
      setShoppingList((prevState) => ({
        ...prevState,
        [product.id]: { ...updatedProduct },
      }));
      try {
        if (!currentUser) return;
        await setDoc(
          userRef,
          {
            cart: {
              [product.id]: updatedProduct,
            },
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  //function to reduce the number of items in the list
  async function reduceProduct(product: Product) {
    const userRef = doc(db, 'users', currentUser.uid);
    if (product.id in shoppingList && shoppingList[product.id].count > 0) {
      const updatedProduct = {
        ...product,
        count: shoppingList[product.id].count - 1,
      }; // updating the product
      setShoppingList((prevState) => ({
        ...prevState,
        [product.id]: { ...updatedProduct },
      }));
      try {
        if (!currentUser) return;
        await setDoc(
          userRef,
          {
            cart: {
              [product.id]: { ...updatedProduct },
            },
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDelete(product: Product) {
    const tempObj = { ...shoppingList };
    delete tempObj[product.id];
    setShoppingList(tempObj);
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(
        userRef,
        {
          cart: {
            [product.id]: deleteField(),
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
