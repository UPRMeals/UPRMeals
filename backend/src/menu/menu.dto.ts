export interface CreateMenuData {
  description?: string | null;
  name: string;
  date: Date;
}

export interface MenuResponse {
  id: number;
  name: string;
  description: string;
  date: Date;
  createdAt: Date;
  removed: boolean;
}

export interface CreateMenuItemData {
  price: number;
  description: string;
  name: string;
  type: string; // This should be an enum
}

export interface CreateMenuItemResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  removed: boolean;
  menuId: number;
}
