export type OrderStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Delivered"
  | "Rejected";

export type OrderItem = {
  name: string;
  quantity: number;
};

export type Combo = {
  name: string;
  items: OrderItem[];
};

export type Order = {
  id: number;
  user: { username: string };
  status: OrderStatus;
  orderItems: OrderItem[];
  orderCombos: Combo[];
};

export const statusColors: Record<
  OrderStatus,
  "default" | "primary" | "error" | "success" | "warning"
> = {
  Pending: "default",
  "In Progress": "primary",
  Completed: "error",
  Delivered: "success",
  Rejected: "warning",
};

export const initialOrders: Order[] = [
  {
    id: 1,
    user: { username: "jorge.cruz23" },
    status: "Pending",
    orderItems: [{ name: "Jamon y Queso", quantity: 1 }],
    orderCombos: [
      {
        name: "Combo Internacional",
        items: [
          { name: "Combo Item 1", quantity: 2 },
          { name: "Combo Item 2", quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    user: { username: "user_two" },
    status: "In Progress",
    orderItems: [{ name: "Steak and Cheese", quantity: 1 }],
    orderCombos: [
      {
        name: "Medianoche Special",
        items: [{ name: "Combo Item A", quantity: 3 }],
      },
    ],
  },
  {
    id: 3,
    user: { username: "user_three" },
    status: "Completed",
    orderItems: [{ name: "Pernil", quantity: 1 }],
    orderCombos: [
      {
        name: "Cubano",
        items: [
          { name: "Combo Item X", quantity: 2 },
          { name: "Combo Item Y", quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 4,
    user: { username: "user_four" },
    status: "Delivered",
    orderItems: [{ name: "Steak and Cheese", quantity: 1 }],
    orderCombos: [
      {
        name: "Cubano",
        items: [
          { name: "Combo Item X", quantity: 2 },
          { name: "Combo Item Y", quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 5,
    user: { username: "user_five" },
    status: "Pending",
    orderItems: [{ name: "Medianoche", quantity: 3 }],
    orderCombos: [
      {
        name: "Combo Internacional",
        items: [
          { name: "Combo Item 1", quantity: 2 },
          { name: "Combo Item 2", quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 6,
    user: { username: "user_six" },
    status: "Rejected",
    orderItems: [{ name: "Jamon y Queso", quantity: 1 }],
    orderCombos: [
      {
        name: "Medianoche Special",
        items: [{ name: "Combo Item A", quantity: 3 }],
      },
    ],
  },
];
