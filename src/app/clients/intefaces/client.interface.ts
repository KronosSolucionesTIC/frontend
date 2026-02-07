export interface Client {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
}