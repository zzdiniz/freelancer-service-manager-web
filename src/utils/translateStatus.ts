type Status = 'done' | 'canceled' | 'scheduled' | 'unavailable' | "available"
const translateStatus = (status: string): string => {
    const statusTranslations: Record<Status, string> = {
      done: 'concluído',
      canceled: 'cancelado',
      scheduled: 'agendado',
      unavailable: 'indisponível',
      available: 'disponível'
    };
  
    return statusTranslations[status as Status];
  }

export default translateStatus