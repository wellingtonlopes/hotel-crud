export interface ClientInterface {
  clientId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ClientResponse {
  clientList: ClientInterface[],
  totalCount: number
}