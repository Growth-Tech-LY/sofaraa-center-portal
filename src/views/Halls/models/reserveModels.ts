
type Hall = {
  id: string
  name: string
  hourPrice: number
  halfDayPrice: number
  weekPrice: number
  monthPrice: number
}


type Service = {
  id: string,
  name: string,
  servicePrice: number,
  
}

type Customer = {
  id: string,
  name: string,
  phoneNumber:string ,
  emai: string
}


type packages = {
  id: string,
  name: string,
  hourPrice: number,
  halfDayPrice: number,
  weekPrice: number,
  monthPrice: number,
}

type Postreservation = {
  
  fromTime: number,
  toTime: number,
  startDate:number ,
endDate: string,
  typeOfReservations: number,
 
}

type PostReservationHalls = {

  hall_ManagementId: string,
  packageManagementId: string,
  serviceManagementId: string,
  totalPrice: number,
  payedPrice: number,
restPrice: number,
  fromTime: number,
  toTime: number,
  startDate: string,
  endDate: string,
  reservationsTypeId: number,
  paymentMethodId: number,
  numberOfRquiredHours: number,
  numberOfIndividuals: number,
  customerManegentId: string
}


export type { Hall, Service , Customer , packages , PostReservationHalls}