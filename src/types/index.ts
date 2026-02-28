export interface User {
  id: string;
  name: string;
  email: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  rpp: number;
  page: number;
  more: boolean;
}

export type TradeType = 'OFFERING' | 'RECEIVING';

export interface TradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: TradeType;
  card: Card;
}

export interface Trade {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: TradeCard[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'cards'>;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
}

export interface CreateTradePayload {
  cards: {
    cardId: string;
    type: TradeType;
  }[];
}

export interface CreateTradeResponse {
  tradeId: string;
}
