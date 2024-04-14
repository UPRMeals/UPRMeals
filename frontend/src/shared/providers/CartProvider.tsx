import { useFormik } from "formik";
import React, { PropsWithChildren, createContext, useContext } from "react";

//TODO: FIX TYPES

const cartInitialValues = {
  items: [],
  total: 0,
};

interface CartSchema {
  items: { id: number; price: number; quantity: number }[];
  total: number;
}

const CartContext = createContext<{
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  clearItem: (item: any) => void;
  getItemCount: (item?: any) => number;
  getItems: () => any;
  getTotalPrice: () => number;
}>({
  addItem: (item) => {
    console.log(item);
  },
  removeItem: (item) => {
    console.log(item);
  },
  clearItem: (item) => {
    console.log(item);
  },
  getItemCount: (item) => {
    return 0;
  },
  getItems: () => {
    return [];
  },
  getTotalPrice: () => {
    return 0;
  },
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const formik = useFormik<CartSchema>({
    initialValues: cartInitialValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  //adds removes one of that item
  const addItem = (item: { id: number; price: number; quantity: number }) => {
    const existingItemIndex = formik.values.items.findIndex(
      (_item) => _item.id === item.id
    );
    if (existingItemIndex !== -1) {
      const updatedItems = formik.values.items;
      updatedItems[existingItemIndex].quantity += 1;
      formik.setFieldValue("items", updatedItems);
    } else {
      formik.setFieldValue("items", [
        ...formik.values.items,
        { ...item, quantity: 1 },
      ]);
    }
  };

  //only removes one of that item
  const removeItem = (item: {
    id: number;
    price: number;
    quantity: number;
  }) => {
    const existingItemIndex = formik.values.items.findIndex(
      (i) => i.id === item.id
    );
    if (existingItemIndex !== -1) {
      const updatedItems = formik.values.items;
      if (updatedItems[existingItemIndex].quantity > 1) {
        updatedItems[existingItemIndex].quantity -= 1;
      } else {
        updatedItems.splice(existingItemIndex, 1);
      }
      formik.setFieldValue("items", updatedItems);
    }
  };

  //removes all of that item
  const clearItem = (item: any) => {
    formik.setFieldValue(
      "items",
      formik.values.items.filter((_item) => _item.id !== item.id)
    );
  };

  //if item is provided returns amount of that item, if not it returns total amount of all items
  const getItemCount = (item?: any) => {
    let count = 0;
    if (item) {
      count =
        formik.values.items.find((_item) => _item.id === item.id)?.quantity ??
        0;
    } else {
      formik.values.items.forEach((item) => {
        count += item.quantity;
      });
    }
    return count;
  };

  const getItems = () => {
    return formik.values.items;
  };

  const getTotalPrice = () => {
    const items = formik.values.items;
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        getItemCount,
        getItems,
        clearItem,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function getCartLayout(page: React.ReactElement) {
  return <CartProvider>{page}</CartProvider>;
}

export default CartProvider;
