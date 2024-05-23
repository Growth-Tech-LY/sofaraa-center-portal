type Coures = {
  id: string
  couresName: string
  techerName: string
  price: number
  timeFrom: string
  timeTo: string
  dateFrom: Date
  dateTo: Date
}
type PostCoures = {
  reservationId: string
  couresManagementId: string
  teacherManagementId: string
  hall_managementId: string
  serviceManagementId: string
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
}

export type { Coures, PostCoures }
