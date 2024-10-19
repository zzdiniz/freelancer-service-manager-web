import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { AppointmentsPerMonth } from "@/types/Metrics";

interface AppointmentsChartProps {
  appointmentsPerMonth: AppointmentsPerMonth[];
}

const AppointmentsChart = ({ appointmentsPerMonth }: AppointmentsChartProps) => {
  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <CardHeader>
        <CardTitle>Agendamentos Mensais</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={appointmentsPerMonth}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="appointments" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total de agendamentos durante o ano
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsChart;
