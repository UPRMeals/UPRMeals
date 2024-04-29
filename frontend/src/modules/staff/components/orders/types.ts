import { Colors } from "@/styles/theme";
import { indigo, lightGreen } from "@mui/material/colors";

export type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DELIVERED"
  | "REJECTED";

export interface BasicItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  type?: string;
  status?: string;
}

export interface OrderItem {
  id: number;
  item: BasicItem;
  orderId: number;
  removed: boolean;
}

export interface ComboItem {
  id: number;
  combo: Combo;
  item: BasicItem;
  removed: boolean;
}

export interface Combo {
  id: number;
  name: string;
  description?: string;
  price: number;
  status?: string;
  comboItems: ComboItem[];
}

export interface OrderCombo {
  comboId: number;
  orderId: number;
  combo: Combo;
  removed: boolean;
  orderComboItems: ComboItem[];
}

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Order {
  id: number;
  userId: number;
  user: User;
  status: OrderStatus;
  totalPrice: number;
  orderItems: OrderItem[];
  orderCombos: OrderCombo[];
  createdAt: Date;
  updatedAt: Date;
  removed: boolean;
}

export const statusColors: Record<OrderStatus, string> = {
  PENDING: indigo[500],
  IN_PROGRESS: Colors.OrangeSunset,
  COMPLETED: lightGreen[500],
  DELIVERED: Colors.Teal,
  REJECTED: Colors.Red,
};
