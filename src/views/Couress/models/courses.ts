type Couress = {
  id: string
  couresManagementName: string
  teacherManagementName: string
  hall_managementName: string
  serviceManagementName: string[]
  reservationsTypeId: number
  startDate: string
  endDate: string
  numberOfRquiredHours: number

  studentName: string[]
  price: number
  numberOfMaximumIndividuals: number
}
type PostCoures = {
  couresManagementId: string | undefined
  teacherManagementId: string | undefined
  hall_managementId: string | undefined
  serviceManagementId: string[] | undefined
  Price: number | undefined
  numberOfRquiredHours: number | undefined
  numberOfMaximumIndividuals: number | undefined
  fromTime: number | undefined
  toTime: number | undefined
  startDate: string | undefined
  endDate: string | undefined
  reservationsTypeId: number | undefined
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

export type { Couress, PostCoures, student, postStudents, studentInfo }
