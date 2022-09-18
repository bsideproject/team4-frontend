export interface QuickRecord {
  quickId: number,
  count: number,
  explanation: string,
  name: string,
  order: number,
  total: number
}

export interface Todo {
  checklistId: number,
  title: string,
  explanation: string,
  date: string,
  done?: boolean,
  isDoen?: boolean,
  isRepeated: boolean,
  repeatDetail: Repeat
}

interface Repeat {
  eventPeriod?: string,
  eventDate?: string,
  eventMonth?: string,
  eventDay?: string,
  eventWeek?: string,
  endedAt?: string,
}
