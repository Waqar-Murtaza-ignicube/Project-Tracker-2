import { useDispatch, useSelector } from "react-redux";
import IMG from "../../../../assets/landing-page-login.jpg";
import MemberSignupForm from "./MemberSignupForm";
import { memberRegister } from "../memberSignupSlice";
import { useNavigate } from "react-router-dom";
import { usePostMemberCredentialsMutation } from "../../../../api/rtkQuery/Accounts/memberSignupApi";
import { ApiResponse } from "../../../../interfaces/globalInterfaces";
import { MemberCreds } from "../signupInterface";

const MemberSignUp: React.FC = () => {
  const memberCreds: MemberCreds = useSelector((store: any) => store.member);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postMemberCredentials] = usePostMemberCredentialsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(memberRegister({ ...memberCreds, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error }: ApiResponse = await postMemberCredentials(
      memberCreds
    );
    if (data) {
      navigate("/login");
    } else if (error) {
      console.log(error);
    }
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
        <MemberSignupForm
          handleChange={handleChange}
          handleSignup={handleSignup}
          memberCreds={memberCreds}
        />
      </div>
    </div>
  );
};

export default MemberSignUp;
