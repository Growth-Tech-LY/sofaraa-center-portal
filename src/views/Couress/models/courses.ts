type Coures = {
  id: string
  couresManagementName: string
  teacherManagementName: string
  hall_managementName: string
  serviceManagementName: string[]

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
  fromTime: number | undefined
  toTime: number | undefined
  startDate: string | undefined
  endDate: string | undefined
}

type student = {
  studentManagementId: string | null
  payedPrice: number | null
}

type postStudents = {
  trainingCouresReservationsId: string
  studentInfoManagement: student[]
}

type studentInfo = {
  studentManagementId: string
  studentName: string
  payedPrice: number
  restPrice: number
}
export type List<T> = {
  total: number
  data: T
}

export type { Coures, PostCoures, student, postStudents, studentInfo }
