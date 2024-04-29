import Button from "../../../components/Button";
import { UpdateClientProps } from "../clientInterface";

const UpdateForm: React.FC<UpdateClientProps> = ({
  client,
  handleChange,
  handleUpdateClient,
}) => {
  return (
    <form onSubmit={handleUpdateClient}>
      <label className="text-white font-normal" htmlFor="client_name">
        Client Name
      </label>
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="text"
        name="client_name"
        value={client.client_name}
        onChange={handleChange}
      />
      <label className="text-white font-normal" htmlFor="client_contact">
        Client Contact
      </label>
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="text"
        name="client_contact"
        value={client.client_contact}
        onChange={handleChange}
      />
      <label className="text-white font-normal" htmlFor="client_status">
        Client Status
      </label>
      <select
        className="p-3 w-full rounded-sm mb-6 mt-1 bg-white"
        name="client_status"
        id="client_status"
        value={client.client_status}
        onChange={handleChange}
      >
        <option value="active">Active</option>
        <option value="unactive">Unative</option>
      </select>
      <Button />
    </form>
  );
};

export default UpdateForm;
