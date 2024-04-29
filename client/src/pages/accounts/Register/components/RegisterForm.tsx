import Button from "../../../../components/Button";
import { RegisterProps } from "../registerInterface";

const RegisterForm: React.FC<RegisterProps> = ({
  handleChange,
  handleSignup,
  registerCreds,
}) => {
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
            value={registerCreds.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex-col w-3/6">
          <label className="text-white" htmlFor="email">
            Email
          </label>{" "}
          <input
            className="p-2 w-full rounded-sm mb-4 mt-1"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={registerCreds.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-5 justify-between">
        <div className="flex-col w-3/6">
          <label className="text-white" htmlFor="date_of_birth">
            DOB
          </label>{" "}
          <input
            className="p-2 w-full rounded-sm mb-4 mt-1"
            type="date"
            name="date_of_birth"
            placeholder="Enter your date of birth"
            value={registerCreds.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="flex-col w-3/6">
          <label className="text-white" htmlFor="gender">
            Gender
          </label>{" "}
          <select
            className="p-3 w-full rounded-sm mb-4 mt-1 bg-white"
            name="gender"
            id="gender"
            value={registerCreds.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <label className="text-white" htmlFor="password">
        Password
      </label>{" "}
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={registerCreds.password}
        onChange={handleChange}
      />
      <label className="text-white" htmlFor="confirm_password">
        Confirm Password
      </label>{" "}
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="password"
        name="confirm_password"
        placeholder="Re-enter your password"
        value={registerCreds.confirm_password}
        onChange={handleChange}
      />
      <Button />
    </form>
  );
};

export default RegisterForm;
