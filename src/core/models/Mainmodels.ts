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
  dayPrice: number
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
  price: number
}

type Teacher = {
  id: String
  name: string
  phonenumber: string
  passportnumber: string
  address: string
  academicQualification: string
  pdfFileName: string
}

type Student = {
  id: string
  name: string
  phonenumber: string
  email: string
  address: string
  imageFileName: string
}

export type { Customer, Service, Coures, Hall, Teacher, Student }
