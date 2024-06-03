type Coures = {
  id: string
  couresManagementName: string
  teacherManagementName: string
  hall_managementName: string
  serviceManagementName: string[]
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  numberOfRquiredHours: number
  numberOfIndividuals: number
  studentName: string[]
  price: number
}
type PostCoures = {
  couresManagementId: string | undefined
  teacherManagementId: string | undefined
  hall_managementId: string | undefined
  serviceManagementId: string[] | undefined
  Price: number | undefined
  numberOfRquiredHours: number | undefined
  numberOfIndividuals: number | undefined

  startDate: string | undefined
  endDate: string | undefined
}

type student = {
  studentManagementId: string
  payedPrice: number
}

type postStudents = {
  trainingCouresReservationsId: string
  studentInfoManagement: student[]
}
export type List<T> = {
  total: number
  data: T
}

export type { Coures, PostCoures, student, postStudents }
