export interface Order {
  id: string;
  idCliente: string;
  nombreCliente: string;
  emailCliente: string;
  total: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateOrderRequest {
  clientId: string;
  totalAmount: number;
}