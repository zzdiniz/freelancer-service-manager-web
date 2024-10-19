import AppointmentsChart from "@/components/AppointmentsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import providerService from "@/services/providerService";
import { Metrics } from "@/types/Metrics";
import { useEffect, useState } from "react";
import {
  DollarSignIcon,
  ChartColumnIcon,
  XCircleIcon,
  UsersIcon,
  StarIcon
} from "lucide-react";
import formatPrice from "@/utils/formatPrice";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();

  useEffect(() => {
    (async () => {
      const response = await providerService.getMetrics();
      setMetrics(response);
    })();
  }, []);

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="p-6 space-y-0 pb-2">
            <CardTitle className="flex flex-row items-center justify-between">
              Receita gerada <DollarSignIcon />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(metrics?.monthEarnings ?? 0)}
            </div>
            <div className="text-xs text-muted-foreground">
              Valor total faturado neste mês
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="p-6 space-y-0 pb-2">
            <CardTitle className="flex flex-row items-center justify-between">
              Ticket Médio <ChartColumnIcon />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(metrics?.averageTicket ?? 0)}
            </div>
            <div className="text-xs text-muted-foreground">
              Valor médio cobrado por serviço prestado.
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="p-6 space-y-0 pb-2">
            <CardTitle className="flex flex-row items-center justify-between">
              Taxa de Cancelamento <XCircleIcon />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.cancellationRate.toFixed(2) ?? 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              Percentual de serviços cancelados neste mês.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="p-6 space-y-0 pb-2">
            <CardTitle className="flex flex-row items-center justify-between">
              Taxa de Retenção <UsersIcon />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.retentionRate.toFixed(2) ?? 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              Percentual de clientes recorrentes neste mês.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <AppointmentsChart
          appointmentsPerMonth={metrics?.appointmentsPerMonth ?? []}
        />
        <div className="col-span-3 flex flex-col space-y-4">
          <Card className="rounded-xl border bg-card text-card-foreground shadow col-span-3 max-h-[410px]">
            <CardHeader className="p-6 space-y-0 pb-2">
              <CardTitle className="flex flex-row items-center justify-between">
              Avaliação Média <StarIcon />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics?.averageRating.toFixed(2) ?? 0}
              </div>
              <p className="text-sm text-muted-foreground">
              Média das avaliações dos serviços prestados.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
