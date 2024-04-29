import { useEffect } from "react";
import IMG from "../../../../assets/landing-page-login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../loginSlice";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useGetAuthenticatedQuery } from "../../../../api/rtkQuery/Auth/checkAuth";
import { LoginCreds } from "../loginInterface";

const Login: React.FC = () => {
  const loginCreds: LoginCreds = useSelector((store: any) => store.login);
  const token = localStorage.getItem("token") as string;
  const group = localStorage.getItem("group");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: isAuth } = useGetAuthenticatedQuery({token});

  useEffect(() => {
    if (group == "Admin" && isAuth) {
      navigate("/clients");
    } else if (group == "Member" && token) {
      navigate("/timesheet");
    } else if (group == "Admin" && !isAuth) {
      navigate("/company");
    }
  }, [isAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(login({ ...loginCreds, [name]: value }));
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
        <h1 className="text-white text-4xl mb-4 font-semibold">Login</h1>
        <p className="text-white font-medium mb-7">
          Sign in now to optimize your workflow and maximize productivity with
          ease.
        </p>
        <LoginForm handleChange={handleChange} loginCreds={loginCreds} />
        <p className="text-white">
          Don't have an account?{" "}
          <a className="underline" href="register/">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
