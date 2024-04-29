import { ChangeHandler } from "../../../types/globalTypes";

export interface LoginProps {
  handleChange: ChangeHandler
  loginCreds: any;
}

export interface LoginCreds {
  email: string;
  password: string;
}