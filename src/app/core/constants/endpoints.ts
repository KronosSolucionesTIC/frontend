import { environment } from "../../../environments/environment";

export const ENDPOINTS = {
  MENU: `${environment.apiUrl}/menu`,
  CLIENTS: {
    GET: `${environment.apiUrl}/clients`,
    CREATE: `${environment.apiUrl}/clients`,
    DELETE: `${environment.apiUrl}/clients`
  },
  AUTH: `${environment.apiUrl}/auth/login`
}