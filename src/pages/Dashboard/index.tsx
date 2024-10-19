import AppointmentsChart from "@/components/AppointmentsChart";
import providerService from "@/services/providerService";
import { AppointmentsPerMonth } from "@/types/Metrics";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [appointmentsPerMonth, setAppointmentsPerMonth] =
    useState<AppointmentsPerMonth[]>();

  useEffect(() => {
    (async () => {
      const response = await providerService.getMetrics();
      setAppointmentsPerMonth(response.appointmentsPerMonth);
    })();
  }, []);

  return (
    <div>
      <AppointmentsChart
        appointmentsPerMonth={appointmentsPerMonth as AppointmentsPerMonth[]}
      />
    </div>
  );
};

export default Dashboard;
