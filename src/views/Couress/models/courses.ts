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
  couresManagementId: string | undefined
  teacherManagementId: string | undefined
  hall_managementId: string | undefined
  serviceManagementId: string | undefined
  totalPrice: number | undefined
  payedPrice: number | undefined
  restPrice: number | undefined
  fromTime: number | undefined
  toTime: number | undefined
  startDate: string | undefined
  endDate: string | undefined
}

export type { Coures, PostCoures }
