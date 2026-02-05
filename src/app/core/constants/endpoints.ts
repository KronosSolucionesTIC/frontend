import { environment } from "../../../environments/environment";

export const ENDPOINTS = {
  MENU: `${environment.apiUrl}/menu`,
  CLIENTS: {
    GET: `${environment.apiUrl}/clients`
  },
  AUTH: `${environment.apiUrl}/auth/login`
}