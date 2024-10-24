// WeeklyCalendar.tsx
import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import Appointment from "../../types/Appointment";
import customStyles from "./index.module.css";
import appointmentService from "../../services/appointmentServices";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import DateModal from "../../components/ui/DateModal";
import Sidebar from "@/components/common/Menu";

const WeeklyCalendar = () => {
  const [weekDays, setWeekDays] = useState<DateTime[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalInfo, setModalInfo] = useState<{
    appointmentId?: number;
    serviceId?: number;
    date?: string;
  }>({});

  const useAuth = useContext(UserContext);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }

  useEffect(() => {
    (async () => {
      await appointmentService.setDone();
    })();
    // Obter a data atual no fuso horário brasileiro
    const now = DateTime.now().setZone("America/Sao_Paulo").setLocale("pt");

    // Calcular a data da segunda-feira da semana atual
    const startOfWeek = now.startOf("week"); // Segunda-feira

    // Gerar os dias da semana (segunda a sexta)
    const days = Array.from({ length: 5 }, (_, index) =>
      startOfWeek.plus({ days: index })
    );
    setWeekDays(days);
    (async () => {
      const response = (await appointmentService.getAll()) as Appointment[];
      setAppointments([...response]);
    })();
    // Definir os appointments (isto pode vir de uma API ou props)
  }, []);

  // Função para verificar se há um appointment em uma data e horário específico
  const getAppointment = (date: DateTime) => {
    const appointment = appointments.find((app) => {
      const appointmentDateTime = DateTime.fromISO(app.datetime).setZone(
        "America/Sao_Paulo"
      );
      // Verifica se o dia e a hora coincidem
      return (
        appointmentDateTime.hasSame(date, "day") &&
        appointmentDateTime.hasSame(date, "hour")
      );
    });
    return {
      appointmentId: appointment?.id,
      serviceId: appointment?.serviceId ?? undefined,
      date,
      status: appointment ? appointment.status : "available",
    }; // Retorna 'available' se não houver appointment
  };

  // Gerar os horários (8h às 18h) para cada dia
  const hours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      <div className={`rounded-xl border bg-card shadow ${customStyles.calendar}`}>
        <table className={customStyles.table}>
          <thead>
            <tr>
              <th className={customStyles.hoursHeader}>Horas</th>
              {weekDays.map((day) => (
                <th key={day.toISO()} className={customStyles.dayHeader}>
                  {day.toFormat("cccc, d MMM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour} className={customStyles.row}>
                <td className={customStyles.hourCell}>{hour}</td>
                {weekDays.map((day) => {
                  const slot = day.set({
                    hour: parseInt(hour.split(":")[0], 10),
                  });
                  const appointment = getAppointment(slot);
                  const status = appointment.status;
                  return (
                    <td
                      key={slot.toISO()}
                      className={`${customStyles.cell} ${customStyles[status]}`}
                      onClick={() => {
                        setIsModalOpen(true);
                        setModalInfo({
                          appointmentId: appointment.appointmentId,
                          serviceId: appointment.serviceId,
                          date: appointment.date.toFormat("dd/MM/yyyy HH:mm"),
                        });
                      }}
                    >
                      <p>{status}</p>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        serviceId={modalInfo.serviceId}
        date={modalInfo.date as string}
        appointmentId={modalInfo.appointmentId}
      />
    </div>
  );
};

export default WeeklyCalendar;
