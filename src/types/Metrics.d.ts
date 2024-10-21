export interface Metrics {
  monthEarnings: number;
  averageTicket: number;
  cancellationRate: number;
  retentionRate: number;
  mostFrequentServiceId: number;
  averageRating: number;
  appointmentsPerMonth: AppointmentsPerMonth[];
  occupationRate: OccupationRate
}

export interface AppointmentsPerMonth {
  month: string;
  appointments: number;
}

export interface OccupationRate {
  availableDates: number;
  busyDates: number;
}