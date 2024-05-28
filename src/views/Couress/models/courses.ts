type Coures = {
  id: string
  couresManagementName: string
  teacherManagementName: string
  hall_managementName: string
  serviceManagementName: string
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  totalPrice: number
  payedPrice: number
  restPrice: number
  studentName: string[]
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
  studentManagementId: string[]
}
export type List<T> = {
  total: number
  data: T
}

export type { Coures, PostCoures }
