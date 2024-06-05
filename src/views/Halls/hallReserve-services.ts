import apiClient from '@/axios'
import type {   PostReservationHalls  , ReservationTable , Postcustomer , CheckHallReservation} from './models/reserveModels'
import type { Hall } from '@/core/models/Mainmodels'
import type { List } from '../Couress/models/courses' 

import type { PaginationParamas    } from '@/core/models/pagination-params'



  const Postreservation = (body: PostReservationHalls) => {
  return apiClient.post<ReservationTable>('HallReservations', body)
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

const putResHall = (body: PostReservationHalls) => {
  return apiClient.put<ReservationTable>('HallReservations', body)

}

const getResHallByID = (id: string) => {
  return apiClient.get<ReservationTable>(`HallReservations/${id}`).then((response) => {
    return response.data
  })
}

const postCustomer = (body: Postcustomer) => {
  return apiClient.post('HallReservations/AddCustomers', body)
}

const CheckHallReserved = (body: CheckHallReservation) => {
  return apiClient.post('HallReservations/CheckHallReservations', body)
}



export {  Postreservation ,getResHallTaple , getResHallByID , deleteResHall , putResHall , postCustomer , CheckHallReserved  }



