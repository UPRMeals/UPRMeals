import { useFormik } from "formik";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { Combo, Item } from "../../../../backend/src/menu/menu.dto";

//TODO: FIX TYPES

const cartInitialValues = {
  combos: [],
  items: [],
  total: 0,
};

export interface CartCombo extends Combo {
  selectedProteins: Item[];
  selectedSides: Item[];
  uId: string;
}

export interface CartItem extends Item {
  quantity: number;
}

interface CartSchema {
  combos: CartCombo[];
  items: CartItem[];
  total: number;
}

const CartContext = createContext<{
  addCombo: (combo: CartCombo) => void;
  removeCombo: (combo: CartCombo) => void;
  getComboCount: () => number;
  getCombos: () => CartCombo[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  clearItem: (item: CartItem) => void;
  getItemCount: (item?: Item) => number;
  getItems: () => CartItem[];
  getTotalPrice: () => number;
}>({
  addCombo: (combo) => {
    console.log(combo);
  },
  removeCombo: (combo) => {
    console.log(combo);
  },
  getComboCount: () => {
    return 0;
  },
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
  getCombos: () => {
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

  const addCombo = (combo: CartCombo) => {
    formik.setFieldValue("combos", [...formik.values.combos, combo]);
  };

  const removeCombo = (combo: CartCombo) => {
    formik.setFieldValue(
      "combos",
      formik.values.combos.filter((_combo) => _combo.uId !== combo.uId)
    );
  };

  const getComboCount: () => number = () => {
    return formik.values.combos.length;
  };

  const getCombos: () => CartCombo[] = () => {
    return formik.values.combos;
  };

  //adds one of that item
  const addItem = (item: Item) => {
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
  const removeItem = (item: Item) => {
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
  const clearItem = (item: CartItem) => {
    formik.setFieldValue(
      "items",
      formik.values.items.filter((_item) => _item.id !== item.id)
    );
  };

  //if item is provided returns amount of that item, if not it returns total amount of all items
  const getItemCount = (item?: Item) => {
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
    const combos = formik.values.combos;
    return (
      items.reduce((acc, item) => acc + item.quantity * item.price, 0) +
      combos.reduce((acc, combo) => acc + combo.price, 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        addCombo,
        removeCombo,
        getComboCount,
        addItem,
        removeItem,
        getItemCount,
        getCombos,
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
