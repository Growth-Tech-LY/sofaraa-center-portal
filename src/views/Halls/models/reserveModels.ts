type packages = {
  id: string
  name: string
  hourPrice: number
  halfDayPrice: number
  weekPrice: number
  monthPrice: number
}

// type Postreservation = {
//   fromTime: number
//   toTime: number
//   startDate: Date | undefined
//   endDate: string
//   typeOfReservations: number
// }

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
  startDate: Date | undefined
  endDate: Date | undefined
  reservationsTypeId: number
  paymentMethodId: number
  numberOfRquiredHours: number
  numberOfIndividuals: number
}

type ReservationTable = {
  id: string
  hall_ManagementName: string
  hall_ManagementId: string
  packageType: string
  customerManegentName: string
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
  serviceManagementName: string[]
  customerManegentPhonenumber: string
  createdAt : Date
} 



type PutReservation = {
  id: string
  hall_ManagementId: string
  packageType: string
  customerManegentId: string
  fromTime: number
  toTime: number
  startDate: Date | undefined
  endDate: Date | undefined
  reservationsTypeId: number
  paymentMethodId: number
  numberOfRquiredHours: number
  numberOfIndividuals: number
  totalPrice: number
  payedPrice: number
  // restPrice: number
  serviceManagementId: string[]
}

type Postcustomer = {
  name: string
  phoneNumber: string
  email: string
}

type editRestPrice = {
  id: string,
  restPrice: number,
}


type CheckHallReservation = {
  hall_ManagementId: string
  fromTime: number
  toTime: number
    startDate: Date | undefined
  endDate: Date | undefined
}

export type { packages, PostReservationHalls, ReservationTable, Postcustomer, CheckHallReservation , PutReservation , editRestPrice}
