export type IUserDetails = {
  userId: string;
  role: 'admin' | 'customer';
};

export type IOrderBook = {
  bookId: string;
  quantity: number;
};

export type IOrderBookPayload = {
  orderedBooks: IOrderBook[];
};
