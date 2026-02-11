import { environment } from "../../../environments/environment";

export const ENDPOINTS = {
  MENU: `${environment.apiUrl}/menu`,
  CLIENTS: {
    GET: `${environment.apiUrl}/clients`,
    CREATE: `${environment.apiUrl}/clients`,
    DELETE: `${environment.apiUrl}/clients`,
    UPDATE: `${environment.apiUrl}/clients`,
  },
  ORDERS: {
    GET: `${environment.apiUrl}/orders`,
    CREATE: `${environment.apiUrl}/orders`,
    DELETE: `${environment.apiUrl}/orders`,
    UPDATE: `${environment.apiUrl}/orders`,
  },
  AUTH: `${environment.apiUrl}/auth/login`
}