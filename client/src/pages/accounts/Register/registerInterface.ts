import { ChangeHandler, SubmitHandler } from "../../../types/globalTypes";

export interface RegisterProps {
  handleChange: ChangeHandler;
  registerCreds: any;
  handleSignup: SubmitHandler;
}

export interface RegisterCreds {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
  gender: string;
}
