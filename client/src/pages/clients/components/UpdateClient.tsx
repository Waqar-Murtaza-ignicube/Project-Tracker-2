import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../clientSlice";
import UpdateForm from "./UpdateForm";
import { useUpdateClientsApiMutation } from "../../../api/rtkQuery/Client/clientApi";
import { Client } from "../clientInterface";
import { ApiResponse } from "../../../interfaces/globalInterfaces";

const UpdateClient: React.FC = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token") as string;
  const client: Client = useSelector((store: any) => store.client);

  const navigate = useNavigate();
  const [updateClientsApi] = useUpdateClientsApiMutation();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(addClient({ ...client, [name]: value }));
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: clientsData, error }: ApiResponse = await updateClientsApi({
      token,
      id,
      client,
    });
    if (clientsData) {
      navigate("/clients");
    } else {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
          <h1 className="text-white text-4xl mb-7 font-semibold ">
            Update Client
          </h1>
          <UpdateForm
            handleChange={handleChange}
            handleUpdateClient={handleUpdateClient}
            client={client}
          />
        </div>
      </section>
    </>
  );
};

export default UpdateClient;
