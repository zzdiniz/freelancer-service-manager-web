import AppointmentsChart from "@/components/AppointmentsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import providerService from "@/services/providerService";
import { Metrics, OccupationRate } from "@/types/Metrics";
import { useEffect, useState } from "react";
import {
  DollarSignIcon,
  ChartColumnIcon,
  XCircleIcon,
  UsersIcon,
  StarIcon,
  TrendingUpIcon
} from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import OccupationRateChart from "@/components/OccupationRateChart";
import Service from "@/types/Service";
import servicesOfferedService from "@/services/servicesOfferedService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    (async () => {
      const response = await providerService.getMetrics();
      setMetrics(response);
    })();
  }, []);
  
  useEffect(() => {
    if (metrics?.mostFrequentServiceId) {
      (async () => {
        const serviceResponse = await servicesOfferedService.getById(metrics?.mostFrequentServiceId);
        setService(serviceResponse);
      })();
    }
  }, [metrics]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Receita gerada", icon: <DollarSignIcon />, value: formatPrice(metrics?.monthEarnings ?? 0), description: "Valor total faturado neste mês" },
          { title: "Ticket Médio", icon: <ChartColumnIcon />, value: formatPrice(metrics?.averageTicket ?? 0), description: "Valor médio cobrado por serviço prestado." },
          { title: "Taxa de Cancelamento", icon: <XCircleIcon />, value: `${metrics?.cancellationRate.toFixed(2) ?? 0}%`, description: "Percentual de serviços cancelados neste mês." },
          { title: "Taxa de Retenção", icon: <UsersIcon />, value: `${metrics?.retentionRate.toFixed(2) ?? 0}%`, description: "Percentual de clientes recorrentes neste mês." },
        ].map((metric, index) => (
          <Card key={index} className="rounded-xl border bg-gray-800 text-gray-100 shadow-md">
            <CardHeader className="p-6 space-y-0 pb-2">
              <CardTitle className="flex flex-row items-center justify-between">
                {metric.title} {metric.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <AppointmentsChart appointmentsPerMonth={metrics?.appointmentsPerMonth ?? []} />
        <div className="col-span-3 flex flex-col space-y-6">
          <div className="flex gap-6">
            <Card className="rounded-xl border bg-gray-800 text-gray-100 shadow-md max-h-[160px] w-full">
              <CardHeader className="p-6 space-y-0 pb-2">
                <CardTitle className="flex flex-row items-center justify-between">
                  Avaliação Média {<StarIcon />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.averageRating.toFixed(2) ?? 0}</div>
                <p className="text-xs text-gray-400">Média das avaliações dos serviços prestados.</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl border bg-gray-800 text-gray-100 shadow-md max-h-[160px] w-full">
              <CardHeader className="p-6 space-y-0 pb-2">
                <CardTitle className="flex flex-row items-center justify-between">
                  Serviço mais solicitado {<TrendingUpIcon />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{service?.name ?? ""}</div>
              </CardContent>
            </Card>
          </div>
          <OccupationRateChart occupationRate={metrics?.occupationRate as OccupationRate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
