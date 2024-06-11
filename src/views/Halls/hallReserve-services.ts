import apiClient from '@/axios'
import type {   PostReservationHalls  , ReservationTable , Postcustomer , CheckHallReservation, PutReservation} from './models/reserveModels'
import type { Hall } from '@/core/models/Mainmodels'
import type { List } from '../Couress/models/courses' 

import type { PaginationParamas    } from '@/core/models/pagination-params'



  const Postreservation = (body: PostReservationHalls) => {
  return apiClient.post<ReservationTable>('HallReservations/CreateHallReservation', body)
}


const getResHallTaple = (paginationParams : PaginationParamas) => {
  return apiClient
    .get<List<ReservationTable[]>>('HallReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}



const deleteResHall = (id: string) => {
  return apiClient.delete<string>(`HallReservations?Id=${id}`)
}

const putResHall = (body: PutReservation) => {
  return apiClient.put<ReservationTable>('HallReservations', body)

}

const getResHallByID = (id: string) => {
  return apiClient.get<ReservationTable>(`HallReservations/${id}`).then((response) => {
    return response.data
  })
}

const postCustomer = (body: Postcustomer) => {
  return apiClient.post('HallReservations/CreateCustomer', body)
}

const CheckHallReserved = (body: CheckHallReservation) => {
  return apiClient.post< {message: string} >('HallReservations/CheckHallReservations', body).then((response ) => {
    return response.data
  })
}

const HallScheduleByMonth = (paginationParams : PaginationParamas) => {
  return apiClient
    .get<List<ReservationTable[]>>('HallReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}
  
export {  Postreservation ,getResHallTaple , getResHallByID , deleteResHall , putResHall , postCustomer , CheckHallReserved  }



