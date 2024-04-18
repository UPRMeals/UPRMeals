import { useFormik } from "formik";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Combo, Item } from "../../../../backend/src/menu/menu.dto";
import { useOrderService } from "../hooks/useOrderService";
import { useRouter } from "next/router";

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
  cartCount: number;
  totalPrice: number;
  addCombo: (combo: CartCombo) => void;
  removeCombo: (combo: CartCombo) => void;
  getComboCount: () => number;
  getCombos: () => CartCombo[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  clearItem: (item: CartItem) => void;
  getItemCount: (item?: Item) => number;
  getItems: () => CartItem[];
  submitOrder: () => void;
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
  cartCount: 0,
  totalPrice: 0,
  submitOrder: () => {},
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { createOrder } = useOrderService();

  const formik = useFormik<CartSchema>({
    initialValues: cartInitialValues,
    onSubmit: async (values) => {
      // handle quantity
      const items = values.items.flatMap((item) => {
        return Array<{ id: number }>(item.quantity).fill({ id: item.id });
      });

      const combos = values.combos.flatMap((combo) => {
        return {
          id: combo.id,
          items: [
            ...combo.selectedProteins.flatMap<{ id: number }>((protein) => ({
              id: protein.id,
            })),
            ...combo.selectedSides.flatMap<{ id: number }>((side) => ({
              id: side.id,
            })),
          ],
        };
      });

      await createOrder({
        items,
        combos,
        totalPrice,
      });
      formik.setValues(cartInitialValues);
      //TODO: Change this to the new order status page
      router.push("/customers/menu");
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

  const getCartCount = () => {
    return getItemCount() + getComboCount();
  };
  const cartCount = getCartCount();

  const getTotalPrice = () => {
    const items = formik.values.items;
    const combos = formik.values.combos;
    return (
      items.reduce((acc, item) => acc + item.quantity * item.price, 0) +
      combos.reduce((acc, combo) => acc + combo.price, 0)
    );
  };

  const totalPrice = getTotalPrice();

  const submitOrder = () => {
    formik.submitForm();
  };

  const value = useMemo(
    () => ({
      cartCount,
      totalPrice,
      addCombo,
      removeCombo,
      getComboCount,
      addItem,
      removeItem,
      getItemCount,
      getCombos,
      getItems,
      clearItem,
      submitOrder,
    }),
    [
      cartCount,
      totalPrice,
      addCombo,
      removeCombo,
      getComboCount,
      addItem,
      removeItem,
      getItemCount,
      getCombos,
      getItems,
      clearItem,
      submitOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function getCartLayout(page: React.ReactElement) {
  return <CartProvider>{page}</CartProvider>;
}

export default CartProvider;
