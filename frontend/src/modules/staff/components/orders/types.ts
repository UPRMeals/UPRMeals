export type OrderStatus =
  | "PENDING"
  | "IN PROGRESS"
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

export const statusColors: Record<
  OrderStatus,
  "default" | "primary" | "error" | "success" | "warning"
> = {
  PENDING: "default",
  "IN PROGRESS": "primary",
  COMPLETED: "error",
  DELIVERED: "success",
  REJECTED: "warning",
};
