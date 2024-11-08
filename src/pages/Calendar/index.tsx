// WeeklyCalendar.tsx
import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import Appointment from "../../types/Appointment";
import appointmentService from "../../services/appointmentServices";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import DateModal from "../../components/ui/DateModal";
import translateStatus from "@/utils/translateStatus";

const getStatusColor = (status:string): string => {
  switch (status) {
      case 'done':
          return 'bg-green-500';
      case 'canceled':
          return 'bg-red-500';
      case 'scheduled':
          return 'bg-blue-500';
      case 'unavailable':
          return 'bg-gray-400';
      default:
          return 'bg-gray-200'; // cor padrão, caso necessário
  }
}

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
      
      const now = DateTime.now().setZone("America/Sao_Paulo").setLocale("pt");
      const startOfWeek = now.startOf("week");
      const days = Array.from({ length: 5 }, (_, index) =>
        startOfWeek.plus({ days: index })
      );
      setWeekDays(days);
      const response = (await appointmentService.getAll()) as Appointment[];
      setAppointments(response);
    })();
  }, []);

  const getAppointment = (date: DateTime) => {
    const appointment = appointments.find((app) => {
      const appointmentDateTime = DateTime.fromISO(app.datetime).plus({hours:3});
      return (
        appointmentDateTime.hasSame(date, "day") &&
        appointmentDateTime.hasSame(date, "hour")
      );
    });
    return {
      appointmentId: appointment?.id,
      serviceId: appointment?.serviceId,
      date,
      status: appointment ? appointment.status : "available",
    };
  };

  const hours = ["9:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  ];

  return (
    <div className="p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-full w-full overflow-hidden">
      <div className="rounded-lg border bg-gray-800 shadow-md p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse max-h-[600px] min-h-[600px] overflow-y-auto">
            <thead>
              <tr className="text-gray-200">
                <th className="p-2 border-b border-gray-700 text-base font-bold">Horas</th>
                {weekDays.map((day) => (
                  <th key={day.toISO()} className="p-2 border-b border-gray-700 text-base font-bold text-gray-400">
                    {day.toFormat("cccc, d MMM")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {hours.map((hour) => (
                <tr key={hour} className="hover:bg-gray-700 transition-colors">
                  <td className="p-2 border-b border-gray-700 text-xs text-gray-200 text-base font-bold">{hour}</td>
                  {weekDays.map((day) => {
                    const slot = day.set({ hour: parseInt(hour.split(":")[0], 10) });
                    const appointment = getAppointment(slot);
                    const status = appointment.status;

                    return (
                      <td
                        key={slot.toISO()}
                        className={`p-2 border-b border-gray-700 cursor-pointer ${status === 'available' ? 'bg-gray-600' : getStatusColor(status)}`}
                        onClick={() => {
                          setIsModalOpen(true);
                          setModalInfo({
                            appointmentId: appointment.appointmentId,
                            serviceId: appointment.serviceId,
                            date: appointment.date.toFormat("dd/MM/yyyy HH:mm"),
                          });
                        }}
                      >
                        <p className="text-base font-bold text-gray-100">{translateStatus(status)}</p>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        serviceId={modalInfo.serviceId}
        date={modalInfo.date as string}
        appointmentId={modalInfo.appointmentId}
        setAppointments={setAppointments}
      />
    </div>
  );
};

export default WeeklyCalendar;
