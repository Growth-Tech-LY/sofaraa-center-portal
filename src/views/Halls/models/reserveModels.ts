


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
  // packageManagementId: string,
  serviceManagementId : string [],
  customerManegentId: string
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
}


export type {  packages , PostReservationHalls}