import { useFormik } from "formik";
import { PropsWithChildren, createContext, useContext } from "react";

//TODO: FIX TYPES

const orderFormInitialValues = {
  items: [],
  total: 0,
};

interface OrderFormSchema {
  items: { id: number }[];
  total: number;
}

const OrderContext = createContext<{
  addItem: (item: any) => void;
  getItemCount: (item: any) => number;
  removeItem: (item: any) => void;
}>({
  addItem: (item) => {
    console.log(item);
  },
  removeItem: (item) => {
    console.log(item);
  },
  getItemCount: (item) => {
    return 0;
  },
});

export const userOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const formik = useFormik<OrderFormSchema>({
    initialValues: orderFormInitialValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const addItem = (item: any) => {
    formik.setFieldValue("items", [...formik.values.items, item]);
  };

  //only removes one
  const removeItem = (item: any) => {
    const lastIndex = formik.values.items.findLastIndex(
      (_item) => item.id === _item.id
    );
    if (lastIndex > -1) {
      formik.setFieldValue(
        "items",
        formik.values.items.filter((_, index) => index !== lastIndex)
      );
    }
  };

  const getItemCount = (item: any) => {
    return formik.values.items.filter((i) => i?.id === item.id).length;
  };

  return (
    <OrderContext.Provider value={{ addItem, removeItem, getItemCount }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
