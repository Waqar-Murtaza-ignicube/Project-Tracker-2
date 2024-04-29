import { ChangeHandler, SubmitHandler } from "../../types/globalTypes";

export interface clientData {
  client_name: string;
  client_status: string;
  client_contact: string;
  id: number;
}

export interface ListProps {
  myClients: clientData[];
  handleDataChange: () => void;
}

export interface Client {
  client_name: string;
  client_contact: string;
  client_status: string;
}

export interface CreateClientProps {
    handleCreateClient: SubmitHandler;
    client: Client;
    handleChange: ChangeHandler;
}

export interface UpdateClientProps {
    handleUpdateClient: SubmitHandler;
    client: Client;
    handleChange: ChangeHandler;
}