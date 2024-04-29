import { ChangeHandler, SubmitHandler } from "../../../types/globalTypes";

export interface SignupProps {
  handleChange: ChangeHandler;
  memberCreds: any;
  handleSignup: SubmitHandler;
}

export interface MemberCreds {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}
