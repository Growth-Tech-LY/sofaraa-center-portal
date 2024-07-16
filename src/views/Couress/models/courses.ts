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
  toTime: number
  fromTime: number
}
type CouressByID = {
  id: string
  couresManagementName: string
  couresManagementId: string
  teacherManagementName: string
  teacherManagementId: string
  hall_managementId: string
  hall_managementName: string
  serviceManagementName: string[]
  reservationsTypeId: number
  startDate: Date
  endDate: Date
  numberOfRquiredHours: number
  studentName: string[]
  price: number
  numberOfMaximumIndividuals: number
  toTime: number
  fromTime: number
}
type PostCoures = {
  id?: string
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
type UpdaterestPricee = {
  trainingCourseReservationsId: string
  studentManagementId: string
  restPrice: number
}

export type UpdaterestPrice = {
  updateStudentInfos: UpdaterestPricee[]
}
type studentInfo = {
  studentManagementId: string
  studentName: string
  payedPrice: number
  restPrice: number
}

export type reservationDate = {
  hall_managementId: string | undefined
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
}
export type List<T> = {
  total: number
  data: T
}

export type { Couress, PostCoures, student, postStudents, studentInfo, CouressByID }
