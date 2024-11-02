import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Service from "../../../types/Service";
import servicesOfferedService from "../../../services/servicesOfferedService";
import Appointment from "../../../types/Appointment";
import appointmentService from "../../../services/appointmentServices";
import { UserContext } from "../../../context/UserContext";
import { Button } from "@/components/ui/button"; // Importando o componente Button da shadcn/ui

interface DateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  appointmentId?: number;
  serviceId?: number;
  date: string;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>
}

const createUnavailableDate = async (appointment: Appointment) => {
  await appointmentService.create(appointment);
};

const cancelAppointment = async (appointmentId: number) => {
  await appointmentService.updateStatus(appointmentId, "canceled");
};

const DateModal = ({
  date,
  serviceId,
  appointmentId,
  isModalOpen,
  setIsModalOpen,
  setAppointments
}: DateModalProps) => {
  const [service, setService] = useState<Service>();
  const useAuth = useContext(UserContext);
  const { provider } = useAuth();

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        const response = await servicesOfferedService.getById(serviceId);
        setService(response);
      };
      fetchService();
    }
  }, [serviceId]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Confirmação de Agendamento</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
        </div>
        <div className="text-gray-700">
          {serviceId ? (
            <div>
              <p>
                Gostaria de cancelar o serviço: <strong>{service?.name}</strong>{" "}
                agendado para: <strong>{date}</strong>?
              </p>
              <Button
                onClick={async () => {
                  await cancelAppointment(appointmentId as number);
                  const response = (await appointmentService.getAll()) as Appointment[];
                  setAppointments(response);
                  setIsModalOpen(false)
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div>
              <p>
                Não há agendamentos reservados para esta data, deseja tornar ela
                indisponível?
              </p>
              <Button
                onClick={async() => {
                  await createUnavailableDate({
                    datetime: date,
                    status: "unavailable",
                    providerId: provider?.id as number,
                  });
                  const response = (await appointmentService.getAll()) as Appointment[];
                  setAppointments(response);
                  setIsModalOpen(false)
                }}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Tornar Indisponível
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateModal;
