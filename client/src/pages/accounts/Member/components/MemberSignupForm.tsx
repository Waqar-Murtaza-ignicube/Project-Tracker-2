import Button from "../../../../components/Button";
import { SignupProps } from "../signupInterface";

const MemberSignupForm: React.FC<SignupProps> = ({ handleSignup, handleChange, memberCreds }) => {
  return (
    <form onSubmit={handleSignup}>
      <div className="flex items-center gap-5 justify-between">
        <div className="flex-col w-3/6">
          <label className="text-white" htmlFor="username">
            Username
          </label>
          <input
            className="p-2 w-full rounded-sm mb-4 mt-1"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={memberCreds.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex-col w-3/6">
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 w-full rounded-sm mb-4 mt-1"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={memberCreds.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <label className="text-white" htmlFor="password">
        Password
      </label>
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={memberCreds.password}
        onChange={handleChange}
      />
      <label className="text-white" htmlFor="confirm_password">
        Confirm Password
      </label>
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="password"
        name="confirm_password"
        placeholder="Re-enter your password"
        value={memberCreds.confirm_password}
        onChange={handleChange}
      />
      <Button />
    </form>
  );
};

export default MemberSignupForm;
