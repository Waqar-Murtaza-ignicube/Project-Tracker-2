import { useDispatch, useSelector } from "react-redux";
import IMG from "../../../../assets/landing-page-login.jpg";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../registerSlice";
import { useNavigate } from "react-router-dom";
import { usePostRegisterCredentialsMutation } from "../../../../api/rtkQuery/Accounts/registerApi";
import { ApiResponse } from "../../../../interfaces/globalInterfaces";
import { RegisterCreds } from "../registerInterface";

const Register = () => {
  const registerCreds: RegisterCreds = useSelector(
    (store: any) => store.register
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postRegisterCredentials] = usePostRegisterCredentialsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(registerUser({ ...registerCreds, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if(registerCreds.confirm_password === registerCreds.password){
      const { data, error }: ApiResponse = await postRegisterCredentials(
        registerCreds
      );
      if (data) {
        console.log(data);
        navigate("/login");
      } else if (error) {
        console.log(error);
      }
    }else console.log("passwords do not match")
  };

  return (
    <div className="flex rounded-lg shadow-2xl justify-center">
      <div className="w-3/6">
        <img
          className="rounded-tl-lg rounded-bl-lg w-full h-full object-cover"
          src={IMG}
          alt=""
        />
      </div>
      <div className="w-3/6 p-10">
        <h1 className="text-white text-4xl mb-4 font-semibold">Sign Up</h1>
        <p className="text-white font-medium mb-7">
          Sign up now to unlock powerful features and elevate your team's
          productivity.
        </p>
        <RegisterForm
          handleChange={handleChange}
          handleSignup={handleSignup}
          registerCreds={registerCreds}
        />
      </div>
    </div>
  );
};

export default Register;
