import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import customStyles from "./index.module.css";
import Service from "../../../types/Service";
import servicesOfferedService from "../../../services/servicesOfferedService";
import Appointment from "../../../types/Appointment";
import appointmentService from "../../../services/appointmentServices";
import { UserContext } from "../../../context/UserContext";

interface DateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  appointmentId?: number;
  serviceId?: number;
  date: string;
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
  console.log(isModalOpen);
  return (
    <div className={customStyles.modaWrapper}>
      <div className={customStyles.modalContainer}>
        <div className={customStyles.modalHeader}>
          <button onClick={() => setIsModalOpen(false)}>X</button>
        </div>
        <div className={customStyles.modalContent}>
          {serviceId ? (
            <div>
              {" "}
              Gostaria de cancelar o serviço:{service?.name} agendodado para:
              {date}?
              <button
                onClick={() => cancelAppointment(appointmentId as number)}
              >
                cancelar
              </button>
            </div>
          ) : (
            <div>
              Não há agendamentos reservados para esta data, deseja tornar ela
              indisponível?
              <button
                onClick={() =>
                  createUnavailableDate({
                    datetime: date,
                    status: "unavailable",
                    providerId: provider?.id as number,
                  })
                }
              >
                tornar indisponível
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateModal;
