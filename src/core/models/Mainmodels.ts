type Service = {
  id: string
  name: string
  servicePrice: number
}

type Customer = {
  id: string
  name: string
  phoneNumber: string
  emai: string
}

type Hall = {
  id: string
  name: string
  hourPrice: number
  halfDayPrice: number
  weekPrice: number
  monthPrice: number
}

type Coures = {
  id: string
  name: string
  totalHours: number
  totalDays: number
  subscriptionPrice: number
  curriculum: string
  level: string
}
export type { Customer, Service, Coures, Hall }
