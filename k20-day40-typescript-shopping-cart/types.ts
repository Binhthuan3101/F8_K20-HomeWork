export type CartItem = {
  readonly productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Cart = {
  readonly CartId: string;
  current: "VND";
  items: readonly CartItem[];
  couponCode?: string;
};
