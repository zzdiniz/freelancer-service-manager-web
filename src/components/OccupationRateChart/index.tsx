import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OccupationRate } from "@/types/Metrics";

interface OccupationRateChartProps {
  occupationRate: OccupationRate;
}

const OccupationRateChart = ({ occupationRate }: OccupationRateChartProps) => {
  const chartData = [
    {
      occupancyStatus: "available",
      count: occupationRate?.availableDates ?? 0,
      fill: "#34D399",
    },
    {
      occupancyStatus: "occupied",
      count: occupationRate?.busyDates ?? 0,
      fill: "#3B82F6",
    },
  ];

  const chartConfig = {
    count: {
      label: "Quantidade",
    },
    available: {
      label: "Disponível",
      color: "#34D399",
    },
    occupied: {
      label: "Ocupado",
      color: "#3B82F6",
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Taxa de Ocupação</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="occupancyStatus" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Quantidade de horários disponíveis/ocupados nesta semana
        </div>
      </CardFooter>
    </Card>
  );
};

export default OccupationRateChart;
