import { Client } from "../../../pages/clients/clientInterface";

export interface PostRequest {
  client: Client;
  token: string;
}

export interface DeleteRequest {
  id: number;
  token: string;
}

export interface UpdateRequest {
  id: unknown;
  client: Client;
  token: string;
}
