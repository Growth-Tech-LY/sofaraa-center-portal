type packages = {
  id: string
  name: string
  hourPrice: number
  halfDayPrice: number
  weekPrice: number
  monthPrice: number
}

type Postreservation = {
  fromTime: number
  toTime: number
  startDate: number
  endDate: string
  typeOfReservations: number
}

type PostReservationHalls = {
  hall_ManagementId: string
  packageType: string
  serviceManagementId: string[]
  customerManegentId: string
  totalPrice: number
  payedPrice: number
  restPrice: number
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  reservationsTypeId: number
  paymentMethodId: number
  numberOfRquiredHours: number
  numberOfIndividuals: number
}

type ReservationTable = {
  id: string
  hall_ManagementName: string
  packageType: string
  customerManegentName: string
  totalPrice: number
  payedPrice: number
  restPrice: number
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  reservationsTypeId: number
  paymentMethodId: number
  numberOfRquiredHours: number
  numberOfIndividuals: number
  serviceManagementName: string[]
  customerManegentPhonenumber: string
} 

type PutReservation = {
  id: string
  hall_ManagementId: string
  packageType: string
  customerManegentId: string
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
  reservationsTypeId: number
  paymentMethodId: number
  numberOfRquiredHours: number
  numberOfIndividuals: number
  totalPrice: number
  payedPrice: number
  restPrice: number
  serviceManagementId: string[]
}

type Postcustomer = {
  name: string
  phoneNumber: string
  email: string
}

type CheckHallReservation = {
  hall_ManagementId: string
  fromTime: number
  toTime: number
  startDate: string
  endDate: string
}

export type { packages, PostReservationHalls, ReservationTable, Postcustomer, CheckHallReservation , PutReservation }
