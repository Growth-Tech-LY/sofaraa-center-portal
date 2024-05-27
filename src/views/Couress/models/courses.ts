type Coures = {
  id: string
  couresManagementId: string
  teacherManagementId: string
  hall_managementId: number
  serviceManagementId: string
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  totalPrice: number
  payedPrice: number
  restPrice: number
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
export type List<T> = {
  total: number
  data: T
}

export type { Coures, PostCoures }
